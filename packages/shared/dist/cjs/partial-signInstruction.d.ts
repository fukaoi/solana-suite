import { TransactionSignature, Keypair } from '@solana/web3.js';
import { Result } from './result';
export declare class PartialSignInstruction {
    hexInstruction: string;
    constructor(instructions: string);
    submit: (feePayer: Keypair) => Promise<Result<TransactionSignature, Error>>;
}
