import { TransactionSignature, Keypair } from '@solana/web3.js';
import { Result } from './result';
export declare class PartialSignInstruction {
    hexInstruction: string;
    data?: unknown;
    constructor(instructions: string, data?: unknown);
    submit: (feePayer: Keypair) => Promise<Result<TransactionSignature, Error>>;
}
