import { Pubkey } from '@solana-suite/shared';

export type History = {
  info: {
    amount?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: number[];
  };
  date: Date;
  type: string;
  sig: string;
  memo?: string;
  innerInstruction: boolean;
};

export enum Filter {
  Transfer = 'transfer',
  TransferChecked = 'transferChecked',
  OnlyMemo = 'spl-memo',
  MintTo = 'mintTo',
  Create = 'create',
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
