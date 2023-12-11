import { Pubkey } from '../account';

export type MintCollectionOptions = {
  freezeAuthority: Pubkey;
  feePayer: Secret;
};
