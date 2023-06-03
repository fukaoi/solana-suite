import { UserSideOutput } from './user-side/output';

export namespace History {
  export type OnOk = (ok: UserSideOutput.History[]) => void;
  export type OnErr = (err: Error) => void;
}
