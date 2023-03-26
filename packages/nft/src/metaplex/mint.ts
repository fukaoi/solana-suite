import {
  TransactionInstruction,
  PublicKey,
  SystemProgram,
} from '@solana/web3.js';

import {
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import {
  Result,
  debugLog,
  Try,
  MintInstruction,
  Secret,
  KeypairAccount,
  Pubkey,
} from '@solana-suite/shared';

import { Storage } from '@solana-suite/storage';

import {
  Validator,
  InputNftMetadata,
  Properties,
  Pda,
  Royalty,
  MetaplexMetadata,
  // User,
  // Infra,
} from '@solana-suite/shared-metaplex';

import {
  createCreateMetadataAccountV2Instruction,
  createCreateMasterEditionV3Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import { Node } from '@solana-suite/shared';
export namespace Metaplex {
  export const createMintInstructions = async (
    mint: PublicKey,
    owner: PublicKey,
    nftMetadata: DataV2,
    feePayer: PublicKey,
    isMutable: boolean
  ): Promise<TransactionInstruction[]> => {
    let ata = await getAssociatedTokenAddress(mint, owner);
    let tokenMetadataPubkey = Pda.getMetadata(mint);
    let masterEditionPubkey = Pda.getMasterEdition(mint);

    const connection = Node.getConnection();

    const inst1 = SystemProgram.createAccount({
      fromPubkey: owner,
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
      mint
    );

    const inst4 = createMintToCheckedInstruction(mint, ata, feePayer, 1, 0);

    const inst5 = createCreateMetadataAccountV2Instruction(
      {
        metadata: tokenMetadataPubkey,
        mint,
        mintAuthority: owner,
        payer: feePayer,
        updateAuthority: owner,
      },
      {
        createMetadataAccountArgsV2: {
          data: nftMetadata,
          isMutable,
        },
      }
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
      }
    );
    return [inst1, inst2, inst3, inst4, inst5, inst6];
  };

  /**
   * Upload content and NFT mint
   *
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {NftMetadata}  input
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
   *   [key: string]?: unknown       // optional param, Usually not used.
   *   creators?: InputCreators[]          // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   maxSupply?: BigNumber         // mint copies
   * }
   * @param {Secret} feePayer?       // fee payer
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Secret
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;

      //Convert porperties, Upload content
      const properties = await Properties.toConvertInfra(
        input.properties,
        Storage.uploadContent,
        input.storageType,
        feePayer
      );

      const inputInfra = {
        ...input,
        properties,
      };

      const sellerFeeBasisPoints = Royalty.convert(inputInfra.royalty);
      const nftStorageMetadata = Storage.toConvertNftStorageMetadata(
        inputInfra,
        sellerFeeBasisPoints
      );
      const uploaded = await Storage.uploadMetaContent(
        nftStorageMetadata,
        inputInfra.filePath,
        inputInfra.storageType,
        payer
      );

      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;

      const datav2 = MetaplexMetadata.toConvertInfra(
        inputInfra,
        uri,
        sellerFeeBasisPoints
      );

      const isMutable =
        inputInfra.isMutable === undefined ? true : inputInfra.isMutable;

      debugLog('# inputInfra: ', inputInfra);
      debugLog('# upload content url: ', uploaded);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# datav2: ', datav2);

      const mint = KeypairAccount.create();
      const insts = await createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );
      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey
      );
    });
  };
}
