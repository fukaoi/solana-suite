import { PublicKey } from '@solana/web3.js';

export type InternalCollection = {
  key: PublicKey;
  verified: boolean;
};

export type InternalCreators = {
  address: PublicKey;
  verified: boolean;
  share: number;
};
