import { Pubkey } from '../account';
import { AuthorityOptions } from '../shared';

export type MintCollectionOptions = {
  freezeAuthority: Pubkey;
  collectionSize: number;
} & AuthorityOptions;
