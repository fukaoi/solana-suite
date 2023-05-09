import { Pubkey, Result } from '@solana-suite/shared';
import { FilterType, UserSideOutput } from '../types/';
export declare namespace SolNative {
    const getHistory: (target: Pubkey, filterType: FilterType, callback: (result: Result<UserSideOutput.History[], Error>) => void, narrowDown?: number) => Promise<void>;
}
