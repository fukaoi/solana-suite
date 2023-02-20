import { Pubkey, Result } from '@solana-suite/shared';
import { SplTokenOwnerInfo } from '../types/spl-token';
export declare namespace SplToken {
    const findByOwner: (owner: Pubkey) => Promise<Result<SplTokenOwnerInfo[], Error>>;
}
