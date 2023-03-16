import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { Result } from '../result';
declare global {
    interface String {
        toPublicKey(): PublicKey;
        toKeypair(): Keypair;
        toExplorerUrl(): string;
        toAddressUrl(): string;
    }
    interface Number {
        toSol(): number;
        toLamports(): number;
    }
    interface Array<T extends TransactionSignature> {
        submit(): Promise<Result<T, Error>>;
    }
    interface Console {
        debug(data: unknown, data2?: unknown, data3?: unknown): void;
    }
}
export type AnyObject = {
    [key: string]: unknown;
};
export type OverwriteObject = {
    existsKey: string;
    will: {
        key: string;
        value: unknown;
    };
};
