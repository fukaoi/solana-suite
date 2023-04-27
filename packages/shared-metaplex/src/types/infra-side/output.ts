import { PublicKey } from '@solana/web3.js';
import { Option } from '../shared';
import { InfraSideInput } from './input';

export namespace InfraSideOutput {
  export type Collection = Option<{
    verified: boolean;
    address: PublicKey;
  }>;

  export type Creator = InfraSideInput.Creator;
}
