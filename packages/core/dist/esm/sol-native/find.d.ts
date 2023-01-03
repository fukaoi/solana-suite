import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { SolNativeOwnerInfo } from '../types/sol-native';
export declare namespace SolNative {
    const findByOwner: (owner: PublicKey) => Promise<Result<SolNativeOwnerInfo, Error>>;
}
