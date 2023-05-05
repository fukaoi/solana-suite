import { Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, FilterType, UserSideOutput } from '../types/';
export declare namespace SolNative {
    const getHistory: (searchPubkey: Pubkey, callback: (result: Result<UserSideOutput.History[], Error>) => void, options?: {
        actionFilter?: FilterType[];
        directionFilter?: DirectionFilter;
    }) => Promise<void>;
}
