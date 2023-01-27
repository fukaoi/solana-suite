import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

import {
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import {
  Node,
  Result,
  MintInstruction,
  Try,
  debugLog,
} from '@solana-suite/shared';

import {
  Bundlr,
  InputTokenMetadata,
  Validator,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';

export namespace SplToken {
  export const createMintInstruction = async (
    connection: Connection,
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: DataV2,
    feePayer: Keypair,
    isMutable: boolean
  ) => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const mint = Keypair.generate();
    const metadataPda = Bundlr.make()
      .nfts()
      .pdas()
      .metadata({ mint: mint.publicKey });

    const tokenAssociated = await getAssociatedTokenAddress(
      mint.publicKey,
      owner
    );

    const inst = SystemProgram.createAccount({
      fromPubkey: feePayer.publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports: lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const inst2 = createInitializeMintInstruction(
      mint.publicKey,
      mintDecimal,
      owner,
      owner,
      TOKEN_PROGRAM_ID
    );

    const inst3 = createAssociatedTokenAccountInstruction(
      feePayer.publicKey,
      tokenAssociated,
      owner,
      mint.publicKey
    );

    const inst4 = createMintToCheckedInstruction(
      mint.publicKey,
      tokenAssociated,
      owner,
      _Calculate.calculateAmount(totalAmount, mintDecimal),
      mintDecimal,
      signers
    );

    const inst5 = createCreateMetadataAccountV2Instruction(
      {
        metadata: metadataPda,
        mint: mint.publicKey,
        mintAuthority: owner,
        payer: feePayer.publicKey,
        updateAuthority: owner,
      },
      {
        createMetadataAccountArgsV2: {
          data: tokenMetadata,
          isMutable,
        },
      }
    );

    signers.push(mint);
    return new MintInstruction(
      [inst, inst2, inst3, inst4, inst5],
      signers,
      feePayer,
      mint.publicKey.toString()
    );
  };

  export const mint = async (
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    input: InputTokenMetadata,
    feePayer?: Keypair
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputTokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      !feePayer && (feePayer = signers[0]);
      const uploaded = await Storage.uploadMetaContent(input, feePayer);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const tokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        collection: reducedMetadata.collection,
        uses: reducedMetadata.uses,
      };
      const isMutable = !reducedMetadata.isMutable ? false : true;

      const connection = Node.getConnection();
      return await createMintInstruction(
        connection,
        owner,
        signers,
        totalAmount,
        mintDecimal,
        tokenMetadata as DataV2,
        feePayer,
        isMutable
      );
    });
  };
}
