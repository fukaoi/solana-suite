import { TransactionSignature, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Pubkey, Secret } from './account.js';
import { R as Result } from './result-b9d23549.js';

declare namespace Transaction {
    type Default = {
        instructions: TransactionInstruction[];
        signers: Keypair[];
        feePayer?: Keypair;
        data?: unknown;
        constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
        submit: () => Promise<Result<TransactionSignature, Error>>;
        batchSubmit: (arr: Default[]) => Promise<TransactionSignature>;
    };
}
declare namespace Transaction {
    type Mint = {
        constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
        submit: () => Promise<Result<TransactionSignature, Error>>;
    };
}
declare namespace Transaction {
    type PartialSign = {
        hexInstruction: string;
        data?: Pubkey;
        constructor: (instructions: string, mint?: Pubkey) => void;
        submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
    };
}
declare global {
    interface Array<T> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
}

export { Transaction };
