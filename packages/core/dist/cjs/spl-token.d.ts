import { Account } from '@solana/spl-token';
import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const calcurateAmount: (amount: number, mintDecimal: number) => number;
    const retryGetOrCreateAssociatedAccountInfo: (mint: PublicKey, owner: PublicKey, feePayer: Signer) => Promise<Result<Account, Error>>;
    const mint: (owner: PublicKey, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const burn: (mint: PublicKey, owner: PublicKey, signers: Signer[], burnAmount: number, tokenDecimals: number, feePayer?: Signer) => Promise<Result.Ok<Instruction, Error> | Result.Err<Instruction, Error>>;
    const transfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const transferNft: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
