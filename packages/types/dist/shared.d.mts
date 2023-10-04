export { R as Result } from './result-b9d23549.js';
import { Find } from './find.mjs';
import { History } from './history.mjs';
import '@solana/web3.js';

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
type OnOk<T extends History | Find> = (ok: T[]) => void;
type OnErr = (err: Error) => void;

export { AnyObject, OnErr, OnOk, OverwriteObject };
