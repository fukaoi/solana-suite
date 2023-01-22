import { Keypair, PublicKey } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
import { TokenMetadata } from '../types';
export declare namespace SplToken {
    const mint: (owner: PublicKey, signers: Keypair[], totalAmount: number, mintDecimal: number, tokenMetadata: TokenMetadata, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
}
