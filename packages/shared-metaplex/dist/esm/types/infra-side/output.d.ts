import { PublicKey } from '@solana/web3.js';
import { InfraSideInput } from './input';
import { Option } from '../shared';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
export declare namespace InfraSideOutput {
    type Collection = Option<{
        verified: boolean;
        address: PublicKey;
    }>;
    type Creator = InfraSideInput.Creator;
    type Offchain = InfraSideInput.Offchain;
    type OnchainAndOffchain = {
        onchain: Metadata;
        offchain: InfraSideOutput.Offchain;
    };
}
