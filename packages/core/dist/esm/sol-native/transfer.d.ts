import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace SolNative {
    const transfer: (source: PublicKey, destination: PublicKey, signers: Keypair[], amount: number, feePayer?: Keypair) => Result<Instruction, Error>;
}
