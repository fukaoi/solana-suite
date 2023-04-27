import { TransactionSignature } from '@solana/web3.js';
import { Result } from './result';
import { Pubkey, Secret } from './types';
export declare class PartialSignInstruction {
    hexInstruction: string;
    data?: Pubkey;
    constructor(instructions: string, mint?: Pubkey);
    submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
}
