import { Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, Filter, TransferHistory } from '../types/history';
export declare namespace SplToken {
    const getHistory: (mint: Pubkey, target: Pubkey, options?: {
        actionFilter?: Filter[];
        directionFilter?: DirectionFilter;
    }) => Promise<Result<TransferHistory[], Error>>;
}
