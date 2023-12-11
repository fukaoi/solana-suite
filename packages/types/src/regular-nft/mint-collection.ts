import { Pubkey, Secret } from '../account';

export type MintCollectionOptions = {
  feePayer: Secret;
  freezeAuthority: Pubkey;
  collectionSize: number;
};
