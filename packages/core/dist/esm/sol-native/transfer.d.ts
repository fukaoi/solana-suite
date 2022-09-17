import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, Instruction, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SolNative {
    const transferWithMultisig: (owner: PublicKey, dest: PublicKey, signers: Keypair[], amount: number, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
    const transfer: (source: PublicKey, destination: PublicKey, signers: Keypair[], amount: number, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransfer: (owner: PublicKey, dest: PublicKey, signers: Keypair[], amount: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
