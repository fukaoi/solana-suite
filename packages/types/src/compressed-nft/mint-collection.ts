import { Pubkey, Secret } from '../account';

export type MintCollectionOptions = {
  freezeAuthority: Pubkey;
  feePayer: Secret;
};
