import { Find } from './find.js';
import { History } from './history.js';
import './account.js';

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
