import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from './input';
import { _Shared } from '../shared';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
export declare namespace InfraSideOutput {
    type Collection = {
        verified: boolean;
        key: PublicKey;
    };
    type OnchainAndOffchain = {
        onchain: Metadata;
        offchain: InfraSideOutput.Offchain;
    };
    type Creator = InfraSideInput.Creators;
    type Offchain = InfraSideInput.Offchain;
    type Uses = _Shared.Uses;
}
