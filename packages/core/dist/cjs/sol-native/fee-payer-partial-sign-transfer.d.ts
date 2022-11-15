import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SolNative {
    const feePayerPartialSignTransfer: (owner: PublicKey, dest: PublicKey, signers: Keypair[], amount: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
