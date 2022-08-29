import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { OwnerInfo } from '../types/sol-native';
export declare namespace SolNative {
    const findByOwner: (owner: PublicKey) => Promise<Result<OwnerInfo, Error>>;
}
