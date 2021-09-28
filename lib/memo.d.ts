/// <reference types="node" />
import { ParsedConfirmedTransaction, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: any) => Buffer;
    const createInstruction: (data: any) => TransactionInstruction;
    const parseInstruction: (tx: ParsedConfirmedTransaction) => string;
    const own: (instruction: TransactionInstruction, sourceSecret: string) => Promise<TransactionSignature>;
}
