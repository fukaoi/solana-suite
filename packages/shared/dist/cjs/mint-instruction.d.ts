import { TransactionSignature, TransactionInstruction } from '@solana/web3.js';
import { Instruction, Result, Secret } from './';
export declare class MintInstruction extends Instruction {
    constructor(instructions: TransactionInstruction[], signers: Secret[], feePayer?: Secret, data?: unknown);
    submit: () => Promise<Result<TransactionSignature, Error>>;
}
