import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplToken {
    interface TransferHistory {
        info: {
            amount: string;
            authority: string;
            destination: string;
            source: string;
        };
        type: string;
        date: Date;
    }
    interface TransferDestinationList {
        destination: string;
        date: Date;
    }
    export const getTransferHistory: (pubkeyStr: string) => Promise<TransferHistory[]>;
    export const getTransferDestinationList: (pubkeyStr: string) => Promise<TransferDestinationList[]>;
    export const create: (sourceSecret: string, totalAmount: number, decimal: number, authority?: string) => Promise<string>;
    export const transfer: (tokenId: string, sourceSecret: string, destination: string, amount: number, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
    export {};
}
