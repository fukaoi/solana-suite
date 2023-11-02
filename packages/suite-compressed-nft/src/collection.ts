import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  DataV2,
  createSetCollectionSizeInstruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';

import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  createAccount,
  createInitializeMint2Instruction,
  createMint,
  mintTo,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { debugLog, Try } from '~/shared';
import { Converter } from '~/converter';
import { Storage } from '~/storage';
import { Validator } from '~/validator';
import { MintInstruction } from '~/instruction';
import { InputNftMetadata } from '~/types/regular-nft';
import { KeypairAccount } from '@solana-suite/spl-token';

export const createMintInstructions = async (
  mint: PublicKey,
  owner: PublicKey,
  nftMetadata: DataV2,
  feePayer: PublicKey,
  isMutable: boolean,
): Promise<TransactionInstruction[]> => {
  const ata = getAssociatedTokenAddressSync(mint, owner);
  const tokenMetadataPubkey = Pda.getMetadata(mint.toString());
  const masterEditionPubkey = Pda.getMasterEdition(mint.toString());
  const connection = Node.getConnection();

  const inst1 = SystemProgram.createAccount({
    fromPubkey: feePayer,
    newAccountPubkey: mint,
    lamports: await getMinimumBalanceForRentExemptMint(connection),
    space: MINT_SIZE,
    programId: TOKEN_PROGRAM_ID,
  });

  const inst2 = createInitializeMintInstruction(mint, 0, owner, owner);

  const inst3 = createAssociatedTokenAccountInstruction(
    feePayer,
    ata,
    owner,
    mint,
  );

  const inst4 = createMintToCheckedInstruction(mint, ata, owner, 1, 0);

  const inst5 = createCreateMetadataAccountV3Instruction(
    {
      metadata: tokenMetadataPubkey,
      mint,
      mintAuthority: owner,
      payer: feePayer,
      updateAuthority: owner,
    },
    {
      createMetadataAccountArgsV3: {
        data: nftMetadata,
        isMutable,
        collectionDetails: { __kind: 'V1', size: new BN(1) },
      },
    },
  );

  const inst6 = createCreateMasterEditionV3Instruction(
    {
      edition: masterEditionPubkey,
      mint,
      updateAuthority: owner,
      mintAuthority: owner,
      payer: feePayer,
      metadata: tokenMetadataPubkey,
    },
    {
      createMasterEditionArgs: {
        maxSupply: 0,
      },
    },
  );
  return [inst1, inst2, inst3, inst4, inst5, inst6];
};

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

      //--- collection ---
      let collection;
      if (input.collection && input.collection) {
        collection = Converter.Collection.intoInfra(input.collection);
        datav2 = { ...datav2, collection };
      }

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# datav2: ', datav2);

      const mint = KeypairAccount.create();

      const insts = await createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        insts.push(
          createDeleagateInstruction(
            mint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
