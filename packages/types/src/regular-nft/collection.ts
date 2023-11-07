import { Pubkey } from '../account';

export type CollectionAccounts = {
  collectionMetadata: Pubkey;
  collectionAuthority: Pubkey;
  collectionMint: Pubkey;
};
