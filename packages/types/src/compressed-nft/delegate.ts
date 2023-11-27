import { Pubkey } from '../account';
import { AuthorityOptions } from '../shared';

export type DelegateOptions = {
  delegate: Pubkey;
} & AuthorityOptions;
