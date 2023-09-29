import { TransactionSignature } from '@solana/web3.js';
import { R as Result } from './result-b9d23549.js';

declare global {
    interface Number {
        toSol(): number;
        toLamports(): number;
    }
    interface Array<T> {
        submit(): Promise<Result<TransactionSignature, Error>>;
    }
    interface Console {
        debug(data: unknown, data2?: unknown, data3?: unknown): void;
    }
}
type AnyObject = {
    [key: string]: unknown;
};
type OverwriteObject = {
    existsKey: string;
    will: {
        key: string;
        value: unknown;
    };
};

export { AnyObject, OverwriteObject, Result };
