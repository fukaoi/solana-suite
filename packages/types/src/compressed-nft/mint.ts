import { Pubkey, Secret } from '../account';

export type MintOptions = {
  receiver: Pubkey;
  delegate: Pubkey;
  feePayer: Secret;
};
