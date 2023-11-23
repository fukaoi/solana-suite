import { createSetCollectionSizeInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { debugLog, Result, Try, unixTimestamp } from '~/shared';
import { Converter } from '~/converter';
import { Account } from '~/account';
import { Storage } from '~/storage';
import { Validator } from '~/validator';
import { MintTransaction } from '~/transaction';
import { InputNftMetadata } from '~/types/regular-nft';
import { Secret } from '~/types/account';
import { RegularNft as Mint } from './mint';
import { MintCollectionOptions } from '~/types/regular-nft';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @return Promise<Result<Instruction, Error>>
 */
export namespace RegularNft {
  export const DEFAULT_COLLECTION_SIZE = 0;
  const DEFAULT_STORAGE_TYPE = 'nftStorage';
  export const mintCollection = (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    options: Partial<MintCollectionOptions> = {},
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const { freezeAuthority, feePayer, collectionSize } = options;
      const payer = feePayer ? feePayer : signer;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;

      //--- porperties, Upload content ---
      let properties;
      if (input.properties) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer,
        );
      }

      input = {
        ...input,
        properties,
      };
      //--- porperties, Upload content ---

      const storageMetadata = Storage.toConvertOffchaindata(input, 0);

      // created at by unix timestamp
      storageMetadata.created_at = unixTimestamp();

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer,
        );
        debugLog('# upload content url: ', uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }

      const datav2 = Converter.RegularNftMetadata.intoInfra(input, uri, 0);

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# datav2: ', datav2);

      const collectionMint = Account.Keypair.create();
      const collectionMetadataAccount = Account.Pda.getMetadata(
        collectionMint.pubkey,
      );

      const instructions = await Mint.createMint(
        collectionMint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        instructions.push(
          Mint.createDeleagate(
            collectionMint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      const collections = {
        collectionMetadata: collectionMetadataAccount,
        collectionAuthority: payer.toKeypair().publicKey,
        collectionMint: collectionMint.toKeypair().publicKey,
      };

      instructions.push(
        createSetCollectionSizeInstruction(collections, {
          setCollectionSizeArgs: {
            size: collectionSize || DEFAULT_COLLECTION_SIZE,
          },
        }),
      );

      return new MintTransaction(
        instructions,
        [signer.toKeypair(), collectionMint.toKeypair()],
        payer.toKeypair(),
        collectionMint.pubkey,
      );
    });
  };
}
