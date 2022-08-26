export interface AccountInfo {
  lamports: number;
  owner: string;
  rentEpoch: number;
}

export interface TokenAccountInfo {
  mint: string;
  owner: string;
  tokenAmount: number;
}

export interface TokenInfoOwned {
  mint: string;
  tokenAmount: number;
}


