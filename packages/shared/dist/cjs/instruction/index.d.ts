import { TransactionSignature, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Result, Secret } from '../';
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Secret[], feePayer?: Secret, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
