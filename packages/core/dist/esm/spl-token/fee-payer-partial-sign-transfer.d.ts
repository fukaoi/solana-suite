import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const feePayerPartialSignTransfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Keypair[], amount: number, mintDecimal: number, feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
