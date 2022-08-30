import { TransactionSignature, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Result } from './';
export declare const MAX_RETRIES = 3;
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
export declare class PartialSignInstruction {
    hexInstruction: string;
    constructor(instructions: string);
    submit: (feePayer: Keypair) => Promise<Result<TransactionSignature, Error>>;
}
