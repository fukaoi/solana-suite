import { Pubkey } from '../account';
import { AuthorityOptions } from '../shared';

export type MintOptions = {
  receiver: Pubkey;
  delegate: Pubkey;
} & AuthorityOptions;
