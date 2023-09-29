import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from '../infra-side/input';
import { Common } from '../common';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export namespace InfraSideOutput {
  export type Collection = {
    verified: boolean;
    key: PublicKey;
  };

  export type OnchainAndOffchain = {
    onchain: Metadata;
    offchain: InfraSideOutput.Offchain;
  };

  export type Creator = InfraSideInput.Creators;
  export type Offchain = InfraSideInput.Offchain;
  export type Uses = Common.Uses;
}
