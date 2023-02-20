import { Result, Pubkey } from '@solana-suite/shared';
import { TransferHistory, Filter, DirectionFilter } from '../types/history';
export declare namespace SolNative {
    const getHistory: (searchPubkey: Pubkey, options?: {
        limit?: number;
        actionFilter?: Filter[];
        directionFilter?: DirectionFilter;
    }) => Promise<Result<TransferHistory[], Error>>;
}
