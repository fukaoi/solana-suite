import { PublicKey, Keypair, TransactionSignature } from '@solana/web3.js';
import { Result } from './';
declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(): string;
        toAddressUrl(): string;
    }
    interface Array<T> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
}
export declare const tryCatch: (fn: () => {}) => Result.Ok<{}, Error> | Result.Err<{}, Error>;
