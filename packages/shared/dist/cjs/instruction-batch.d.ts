import { TransactionSignature } from '@solana/web3.js';
import { Instruction } from './instruction';
export declare class InstructionBatch {
    static submit: (arr: Instruction[]) => Promise<TransactionSignature>;
}
