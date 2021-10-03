import { Keypair, PublicKey, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplToken {
    interface TransferHistory {
        info: {
            amount: string;
            authority: PublicKey;
            destination: PublicKey;
            source: PublicKey;
        };
        type: string;
        date: Date;
    }
    interface TransferDestinationList {
        dest: PublicKey;
        date: Date;
    }
    export const getTransferHistory: (pubkey: PublicKey) => Promise<TransferHistory[]>;
    export const getTransferDestinationList: (pubkey: PublicKey) => Promise<TransferDestinationList[]>;
    export const create: (source: Keypair, totalAmount: number, decimal: number, authority?: PublicKey) => Promise<string>;
    export const transfer: (tokenKey: PublicKey, source: Keypair, dest: PublicKey, amount: number, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
    export {};
}
