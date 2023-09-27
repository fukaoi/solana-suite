import { Pubkey, Result } from 'shared';
import { OwnerInfo } from '../types/sol-native';
export declare namespace SolNative {
    const findByOwner: (owner: Pubkey) => Promise<Result<OwnerInfo, Error>>;
}
