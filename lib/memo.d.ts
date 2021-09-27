/// <reference types="node" />
import { TransactionInstruction, TransactionResponse, TransactionSignature } from '@solana/web3.js';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: any) => Buffer;
    const createInstruction: (data: any) => TransactionInstruction;
    const parseInstruction: (tx: TransactionResponse) => any;
    const own: (instruction: TransactionInstruction, sourceSecret: string) => Promise<TransactionSignature>;
}
