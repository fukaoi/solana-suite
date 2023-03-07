import { Result, Pubkey } from '@solana-suite/shared';
import { TransferHistory, Filter, DirectionFilter } from '../types/history';
export declare namespace SplToken {
    const getHistory: (mint: Pubkey, searchPubkey: Pubkey, options?: {
        limit?: number;
        actionFilter?: Filter[];
        directionFilter?: DirectionFilter;
    }) => Promise<Result<TransferHistory[], Error>>;
}
