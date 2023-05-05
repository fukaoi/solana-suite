import { Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, FilterType, UserSideOutput } from '../types/';
export declare namespace SplToken {
    const getHistory: (mint: Pubkey, target: Pubkey, callback: (result: Result<UserSideOutput.History[], Error>) => void, options?: {
        actionFilter?: FilterType[];
        directionFilter?: DirectionFilter;
    }) => Promise<void>;
}
