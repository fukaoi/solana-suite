import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SolNative {
    const transferWithMultisig: (owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const transfer: (source: PublicKey, destination: PublicKey, signers: Signer[], amount: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransfer: (owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
