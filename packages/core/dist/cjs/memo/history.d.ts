import { Pubkey, Result } from '@solana-suite/shared';
import { UserSideOutput } from '../types/';
export declare namespace Memo {
    const getHistory: (target: Pubkey, callback: (result: Result<UserSideOutput.History[], Error>) => void, narrowDown?: number) => Promise<void>;
}
