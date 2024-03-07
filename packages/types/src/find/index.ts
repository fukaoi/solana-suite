import { Pubkey } from '../account';

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortBy {
  Created = 'created',
  Updated = 'updated',
  Recent = 'recent_action',
}

export type Sortable = {
  sortBy: SortBy;
  sortDirection: SortDirection;
};

export type FindOptions = {
  limit: number;
  page: number;
  sort: Sortable;
  before: string;
  after: string;
};

export type Find = {
  sol?: string;
  account?: string;
  destination?: Pubkey;
  source?: Pubkey;
  authority?: Pubkey;
  multisigAuthority?: Pubkey;
  signers?: Pubkey[];
  mint?: Pubkey;
  mintAuthority?: Pubkey;
  tokenAmount?: string;
  memo?: string;
  dateTime?: Date;
  type?: string;
  sig?: string;
  innerInstruction?: boolean;
};
