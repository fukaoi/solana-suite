import { TransactionInstruction, Keypair, TransactionSignature } from '@solana/web3.js';
import { Result } from './shared.js';
import { Pubkey, Secret } from './account.js';

declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
    static batchSubmit: (arr: Instruction[]) => Promise<TransactionSignature>;
}
declare class MintInstruction extends Instruction {
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
declare class PartialSignInstruction {
    hexInstruction: string;
    data?: Pubkey;
    constructor(instructions: string, mint?: Pubkey);
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
}

export { Instruction, MintInstruction, PartialSignInstruction };
