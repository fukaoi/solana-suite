import { PublicKey, Keypair, TransactionSignature } from '@solana/web3.js';
import { Result, Instruction } from './';
declare global {
    interface String {
        toPubkey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(): string;
        toAddressUrl(): string;
    }
    interface Array<T extends Instruction[]> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
}
export declare const tryCatch: (fn: () => {}) => any;
