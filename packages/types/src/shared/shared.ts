import { Pubkey } from '../account';
import { Find } from '../find';
import { History } from '../history';

export type AnyObject = {
  [key: string]: unknown;
};

export type OverwriteObject = {
  existsKey: string;
  will: { key: string; value: unknown };
};

export type OnOk<T extends History | Find> = (ok: T[]) => void;
export type OnErr = (err: Error) => void;

export type AuthorityOptions = {
  feePayer: Pubkey;
};
