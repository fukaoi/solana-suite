import { Keypair, PublicKey } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const add: (token: PublicKey, owner: PublicKey, signers: Keypair[], totalAmount: number, mintDecimal: number, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
}
