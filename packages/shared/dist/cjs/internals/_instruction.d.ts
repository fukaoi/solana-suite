import { TransactionSignature } from '@solana/web3.js';
import { Result } from '../';
import { Instruction } from '../instruction';
export declare class Internals_Instruction {
    static batchSubmit: (arr: Instruction[]) => Promise<Result<TransactionSignature, Error>>;
}
