import { PublicKey, Transaction } from '@solana/web3.js';

type connectOption = {
    onlyIfTrusted: false;
};
type PhantomProvider = {
    isPhantom?: boolean;
    publicKey: PublicKey | null;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
};

export type { PhantomProvider as P, connectOption as c };
