import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { SplTokenOwnerInfo } from '../types/spl-token';
export declare namespace SplToken {
    const findByOwner: (owner: PublicKey) => Promise<Result<SplTokenOwnerInfo[], Error>>;
}
