import { Pubkey, Secret } from '../account';

export type MintCollectionOptions = {
  feePayer: Secret;
  freezeAuthority: Pubkey;
  collectionSize: number;
};

export type Collection = { address: Pubkey; verified: boolean };
