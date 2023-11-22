import { AuthorityOptions } from '../shared';

export type MintOptions = {
  receiver: Pubkey;
  delegate: Pubkey;
} & AuthorityOptions;
