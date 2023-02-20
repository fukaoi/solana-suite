import { TransactionSignature } from '@solana/web3.js';
import { Result } from './result';
import { Secret } from './types';
export declare class PartialSignInstruction {
    hexInstruction: string;
    constructor(instructions: string);
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
}
