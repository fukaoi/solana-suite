export enum FilterType {
  Transfer = 'transfer',
  TransferChecked = 'transferChecked',
  OnlyMemo = 'spl-memo',
  MintTo = 'mintTo',
}

export enum DirectionFilter {
  Dest = 'destination',
  Source = 'source',
}

export type MappingTokenAccount = {
  account: string;
  owner: string;
};

export type WithMemo = {
  sig: string[];
  memo: string;
};
