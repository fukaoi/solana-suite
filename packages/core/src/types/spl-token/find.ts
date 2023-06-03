import { UserSideOutput } from '@solana-suite/shared-metaplex';

export enum Sortable {
  Asc = 'asc',
  Desc = 'desc',
}

export type OnOk = (ok: UserSideOutput.TokenMetadata[]) => void;
export type OnErr = (err: Error) => void;
