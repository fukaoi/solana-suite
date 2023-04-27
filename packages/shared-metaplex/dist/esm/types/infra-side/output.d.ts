import { PublicKey } from '@solana/web3.js';
import { Option } from '../shared';
import { InfraSideInput } from './input';
export declare namespace InfraSideOutput {
    type Collection = Option<{
        verified: boolean;
        address: PublicKey;
    }>;
    type Creator = InfraSideInput.Creator;
}
