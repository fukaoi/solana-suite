import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';

import BN from 'bn.js';

import {
  createApproveInstruction,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  debugLog,
  KeypairAccount,
  MintInstruction,
  Pubkey,
  Result,
  Secret,
  Try,
} from '@solana-suite/shared';

import { Storage } from 'internal/storage';

import {
  Convert,
  Pda,
  Royalty,
  UserSideInput,
  Validator,
} from 'internal/shared-metaplex';

import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import { Node } from '@solana-suite/shared';
const NFT_AMOUNT = 1;
export namespace Metaplex {
  export const createDeleagateInstruction = (
    mint: PublicKey,
    owner: PublicKey,
    delegateAuthority: PublicKey,
  ): TransactionInstruction => {
    const tokenAccount = getAssociatedTokenAddressSync(mint, owner);

    return createApproveInstruction(
      tokenAccount,
      delegateAuthority,
      owner,
      NFT_AMOUNT,
    );
  };

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
   * Upload content and NFT mint
   *
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {UserSideInput.NftMetadata} input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // royalty percentage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Pubkey           // collections of different colors, shapes, etc.
   *   creators?: InputCreators[]    // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   options?: [key: string]?: unknown       // optional param, Usually not used.
   * }
   * @param {Secret} feePayer?         // fee payer
   * @param {Pubkey} freezeAuthority?  // freeze authority
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: UserSideInput.NftMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<UserSideInput.NftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;

      //--- porperties, Upload content ---
      let properties;
      if (input.properties && input.storageType) {
        properties = await Convert.Properties.intoInfraSide(
          input.properties,
          Storage.uploadContent,
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

      const sellerFeeBasisPoints = Royalty.convert(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      nftStorageMetadata.created_at = createdAt;

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.uploadMetaAndContent(
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

      let datav2 = Convert.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      //--- collection ---
      let collection;
      if (input.collection && input.collection) {
        collection = Convert.Collection.intoInfraSide(input.collection);
        datav2 = { ...datav2, collection };
      }

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
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
