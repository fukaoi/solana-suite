import { TransactionSignature, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Secret, Pubkey } from './account.mjs';
import { R as Result } from './result-b9d23549.js';

type Transaction = {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
    submit: () => Promise<Result<TransactionSignature, Error>>;
    batchSubmit: (arr: Transaction[]) => Promise<TransactionSignature>;
};
type MintTransaction = {
    constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
    submit: () => Promise<Result<TransactionSignature, Error>>;
};
type PartialSignTransaction = {
    hexInstruction: string;
    data?: Pubkey;
    constructor: (instructions: string, mint?: Pubkey) => void;
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
};
declare global {
    interface Array<T> {
        submit(feePayer?: Secret): Promise<Result<TransactionSignature, Error>>;
    }
}

export { MintTransaction, PartialSignTransaction, Transaction };
