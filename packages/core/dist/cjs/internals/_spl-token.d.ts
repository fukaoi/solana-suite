import { PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace Internals_SplToken {
    const findAssociatedTokenAddress: (mint: PublicKey, owner: PublicKey) => Promise<Result<PublicKey, Error>>;
    const getOrCreateAssociatedTokenAccountInstruction: (mint: PublicKey, owner: PublicKey, feePayer: PublicKey, allowOwnerOffCurve?: boolean) => Promise<Result<{
        tokenAccount: string;
        inst: TransactionInstruction | undefined;
    }, Error>>;
    const getOrCreateAssociatedTokenAccount: (mint: PublicKey, owner: PublicKey, feePayer: Signer, allowOwnerOffCurve?: boolean) => Promise<Result<string | Instruction, Error>>;
    const calculateAmount: (amount: number, mintDecimal: number) => number;
}
