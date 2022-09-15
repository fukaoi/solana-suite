import {
  Transaction,
  TransactionSignature,
  SendOptions,
  PublicKey,
} from '@solana/web3.js';

export type Phantom = {
  isPhantom?: boolean;
  publicKey: PublicKey;
  isConnected: boolean;
  signTransaction(transaction: Transaction): Promise<Transaction>;
  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
  signAndSendTransaction(
    transaction: Transaction,
    options?: SendOptions
  ): Promise<{ signature: TransactionSignature }>;
  signMessage(message: Uint8Array): Promise<Uint8Array>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  _handleDisconnect(...args: unknown[]): unknown;
};
