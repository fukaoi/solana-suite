import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda } from '@metaplex-foundation/js';
import { Node, Result, Instruction, Try } from '@solana-suite/shared';
import { SplToken as _Calculate } from './calculate-amount';
import { TokenMetadata } from '../types';

export namespace SplToken {
  export const mint = async (
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: TokenMetadata,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      !feePayer && (feePayer = signers[0]);

      const connection = Node.getConnection();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      const mint = Keypair.generate();
      signers.push(mint);
      const metadataPda = await findMetadataPda(mint.publicKey);
      const tokenAssociated = await getAssociatedTokenAddress(
        mint.publicKey,
        owner
      );

      const inst = SystemProgram.createAccount({
        fromPubkey: owner,
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
        owner,
        // tokenAssociated.toPublicKey(),
        tokenAssociated,
        owner,
        mint.publicKey
      );

      const inst4 = createMintToInstruction(
        mint.publicKey,
        // tokenAssociated.toPublicKey(),
        tokenAssociated,
        owner,
        totalAmount
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
            isMutable: true,
          },
        }
      );

      return new Instruction(
        [inst, inst2, inst3, inst4, inst5],
        signers,
        feePayer,
        mint.publicKey.toBase58()
      );
    });
  };
}
