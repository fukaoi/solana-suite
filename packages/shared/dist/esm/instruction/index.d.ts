import { TransactionSignature, Keypair, TransactionInstruction } from '@solana/web3.js';
import { Result, Secret } from '../';
export declare class Instruction {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: unknown;
    constructor(instructions: TransactionInstruction[], signers: Keypair[], feePayer?: Keypair, data?: unknown);
    submit: (feePayer?: Secret) => Promise<Result<TransactionSignature, Error>>;
}
