import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const burn: (mint: PublicKey, owner: PublicKey, signers: Signer[], burnAmount: number, tokenDecimals: number, feePayer?: Signer) => Promise<Result.Ok<Instruction, Error> | Result.Err<Instruction, Error>>;
}
