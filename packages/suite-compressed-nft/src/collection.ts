import { createSetCollectionSizeInstruction } from '@metaplex-foundation/mpl-token-metadata';
import { debugLog, Try } from '~/shared';
import { Converter } from '~/converter';
import { Account } from '~/account';
import { Storage } from '~/storage';
import { Validator } from '~/validator';
import { MintTransaction } from '~/transaction';
import { RegularNft } from '~/suite-regular-nft';
import { InputNftMetadata } from '~/types/regular-nft';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @return Promise<Result<Instruction, Error>>
 */
export namespace CompressedNft {
  export const mintCollection = (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ) => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;

      //--- porperties, Upload content ---
      let properties;
      if (input.properties && input.storageType) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          input.storageType,
          payer,
        );
      } else if (input.properties && !input.storageType) {
        throw Error('Must set storageType if will use properties');
      }

      input = {
        ...input,
        properties,
      };
      //--- porperties, Upload content ---

      const nftStorageMetadata = Storage.toConvertOffchaindata(input, 0);

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      nftStorageMetadata.created_at = createdAt;

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
          payer,
        );
        debugLog('# upload content url: ', uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }

      let datav2 = Converter.NftMetadata.intoInfra(input, uri, 0);
      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# datav2: ', datav2);

      const collectionMint = Account.Keypair.create();

      const collectionMetadataAccount = Account.Pda.getMasterEdition(
        collectionMint.pubkey,
      );

      const insts = await RegularNft.createMintInstructions(
        collectionMint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        insts.push(
          RegularNft.createDeleagateInstruction(
            collectionMint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      insts.push(
        createSetCollectionSizeInstruction(
          {
            collectionMetadata: collectionMetadataAccount,
            collectionAuthority: payer.toKeypair().publicKey,
            collectionMint: collectionMint.toKeypair().publicKey,
          },
          {
            setCollectionSizeArgs: { size: 50 },
          },
        ),
      );

      return new MintTransaction(
        insts,
        [signer.toKeypair(), collectionMint.toKeypair()],
        payer.toKeypair(),
        collectionMint.pubkey,
      );
    });
  };
}
