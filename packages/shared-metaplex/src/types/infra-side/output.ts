import { PublicKey } from '@solana/web3.js';
import { Option } from '../shared';

export namespace InfraSideOutput {
  export type Collection = Option<{
    verified: boolean;
    address: PublicKey;
  }>;
  export type Creator = {
    readonly address: PublicKey;
    readonly share: number;
    readonly verified: boolean;
  };
}
