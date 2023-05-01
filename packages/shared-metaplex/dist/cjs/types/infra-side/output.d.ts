import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from './input';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
export declare namespace InfraSideOutput {
    type Collection = {
        verified: boolean;
        key: PublicKey;
    };
    type Creator = InfraSideInput.Creators;
    type Offchain = InfraSideInput.Offchain;
    type OnchainAndOffchain = {
        onchain: Metadata;
        offchain: InfraSideOutput.Offchain;
    };
}
