import { Keypair, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
import { Result } from '../result';
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
