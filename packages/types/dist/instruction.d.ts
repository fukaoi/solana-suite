import { TransactionSignature, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Pubkey, Secret } from './account.js';
import { Result } from './shared.js';

type Instruction = {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
    submit: () => Promise<Result<TransactionSignature, Error>>;
    batchSubmit: (arr: Instruction[]) => Promise<TransactionSignature>;
};
type MintInstruction = {
    constructor: (instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown) => void;
    submit: () => Promise<Result<TransactionSignature, Error>>;
};
type PartialSignInstruction = {
    hexInstruction: string;
    data?: Pubkey;
    constructor: (instructions: string, mint?: Pubkey) => void;
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
};
declare global {
    interface Array<T> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
}

export { Instruction, MintInstruction, PartialSignInstruction };
