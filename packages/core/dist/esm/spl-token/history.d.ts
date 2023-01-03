import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { TransferHistory, Filter, DirectionFilter } from '../types/history';
export declare namespace SplToken {
    const getHistory: (mint: PublicKey, searchPubkey: PublicKey, options?: {
        limit?: number;
        actionFilter?: Filter[];
        directionFilter?: DirectionFilter;
    }) => Promise<Result<TransferHistory[], Error>>;
}
