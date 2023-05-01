import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from './input';
import { _Same } from '../_same';
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
  export type Uses = _Same.Uses;
}
