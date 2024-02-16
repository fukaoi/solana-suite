import { Pubkey } from '../account';

export type GasLessMintOptions = {
  freezeAuthority: Pubkey;
  isPriorityFee: boolean;
};
