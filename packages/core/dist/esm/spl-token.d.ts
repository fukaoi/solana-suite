import { Account } from '@solana/spl-token';
import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const calcurateAmount: (amount: number, mintDecimal: number) => number;
    const retryGetOrCreateAssociatedAccountInfo: (tokenKey: PublicKey, owner: PublicKey, feePayer: Signer) => Promise<Result<Account, Error>>;
    const mint: (owner: PublicKey, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const burn: (tokenKey: PublicKey, owner: PublicKey, signers: Signer[], burnAmount: number, tokenDecimals: number, feePayer?: Signer) => Promise<Result.Ok<Instruction, Error> | Result.Err<Instruction, Error>>;
    const transfer: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const transferNft: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransfer: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
