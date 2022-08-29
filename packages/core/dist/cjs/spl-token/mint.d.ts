import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const mint: (owner: PublicKey, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
}
