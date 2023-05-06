export enum FilterType {
  Transfer = 'transfer',
  Memo = 'memo',
  Mint = 'mint',
}

export const FilterOptions = {
  Transfer: {
    program: ['system', 'spl-token'],
    action: ['transfer', 'transfer-checked'],
  },
  Memo: {
    program: ['spl-memo'],
    action: ['*'],
  },
  Mint: {
    program: ['spl-token'],
    action: ['mintTo', 'mintToChecked'],
  },
};

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
