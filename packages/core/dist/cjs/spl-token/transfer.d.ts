import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const transfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
