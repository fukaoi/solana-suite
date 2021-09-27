import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplToken {
    interface CreateResponse {
        tokenId: string;
    }
    export const create: (sourceSecret: string, totalAmount: number, decimal: number, authority?: string) => Promise<CreateResponse>;
    export const transfer: (tokenId: string, sourceSecret: string, destination: string, amount: number, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
    export {};
}
