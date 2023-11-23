import { Pubkey } from './account.js';
import { Find } from './find.js';
import { History } from './history.js';

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
type AuthorityOptions = {
    feePayer: Pubkey;
};

export { AnyObject as A, OverwriteObject as O, OnOk as a, OnErr as b, AuthorityOptions as c };
