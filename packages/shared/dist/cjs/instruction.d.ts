import { TransactionSignature, Signer, TransactionInstruction } from '@solana/web3.js';
import { Result } from './';
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Signer[];
    feePayer?: Signer;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Signer[], feePayer?: Signer, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
    static batchSubmit: (arr: Instruction[]) => Promise<Result<TransactionSignature, Error>>;
}
export declare class Instructions<T extends Instruction> extends Array<T> {
    echo(): void;
}
