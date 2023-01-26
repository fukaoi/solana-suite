import { Keypair, PublicKey } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
import { InputTokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace SplToken {
    const mint: (owner: PublicKey, signers: Keypair[], totalAmount: number, mintDecimal: number, tokenMetadata: InputTokenMetadata, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
}
