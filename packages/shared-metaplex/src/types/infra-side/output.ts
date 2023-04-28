import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from './input';
import { Option } from '../shared';
import { _Same } from '../_same';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export namespace InfraSideOutput {
  export type Collection = Option<{
    verified: boolean;
    key: PublicKey;
  }> | undefined;

  export type Creator = InfraSideInput.Creator;
  
  export type Offchain = InfraSideInput.Offchain;

  export type OnchainAndOffchain = {
    onchain: Metadata;
    offchain: InfraSideOutput.Offchain;
  };
}
