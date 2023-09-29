import { Keypair, Transaction, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';

type InitializeMint = {
    mint: Keypair;
    tx: Transaction;
};

type connectOption = {
    onlyIfTrusted: false;
};
type Phantom = {
    isPhantom?: boolean;
    publicKey: PublicKey;
    isConnected: boolean;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signAndSendTransaction(transaction: Transaction, options?: SendOptions): Promise<{
        signature: TransactionSignature;
    }>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    connect(): Promise<{
        publicKey: Uint16Array;
    }>;
    disconnect(): Promise<void>;
    _handleDisconnect(...args: unknown[]): unknown;
};

export { InitializeMint, Phantom, connectOption };
