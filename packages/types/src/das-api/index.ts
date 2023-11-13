import { Pubkey } from '../account';

export type AssetProof = {
  leaf: Pubkey;
  node_index: number;
  proof: Pubkey[];
  root: Pubkey;
  tree_id: Pubkey;
};
