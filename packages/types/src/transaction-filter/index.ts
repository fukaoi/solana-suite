import { PublicKey } from '@solana/web3.js';

export enum FilterType {
  Memo = 'memo',
  Mint = 'mint',
  OnlyMemo = 'only-memo',
  Transfer = 'transfer',
}

export enum ModuleName {
  SolNative = 'system',
  SplToken = 'spl-token',
}

export const FilterOptions = {
  Transfer: {
    program: ['system', 'spl-token'],
    action: ['transfer', 'transferChecked'],
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

export type PostTokenAccount = {
  account: string;
  owner: string;
};

export type WithMemo = {
  sig: string[];
  memo: string;
};

export type Transfer = {
  parsed: {
    info: {
      destination: Pubkey;
      source: Pubkey;
      lamports: number;
    };
    type: string;
  };
  program: string;
  programId?: PublicKey;
};

export type MintTo = {
  parsed: {
    info: {
      account: Pubkey;
      mint: Pubkey;
      mintAuthority: Pubkey;
      tokenAmount: string;
    };
    type: string;
  };
  program: string;
  programId?: PublicKey;
};

export type MintToChecked = MintTo;

export type TransferChecked = {
  parsed: {
    info: {
      destination: Pubkey;
      mint: Pubkey;
      multisigAuthority: Pubkey;
      signers: Pubkey[];
      source: Pubkey;
      tokenAmount: string;
    };
    type: string;
  };
  program: string;
  programId?: PublicKey;
};

export type Memo = {
  parsed: string;
  program: string;
  programId: PublicKey;
};
