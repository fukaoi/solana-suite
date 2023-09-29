import { TransactionInstruction, Keypair, TransactionSignature } from '@solana/web3.js';
import { R as Result } from './result-b9d23549.js';
import { Pubkey, Secret } from './account.mjs';

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

export { Instruction, MintInstruction, PartialSignInstruction };
