import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { OwnerInfo } from '../types/spl-token';
export declare namespace SplToken {
    const findByOwner: (owner: PublicKey) => Promise<Result<OwnerInfo[], Error>>;
}
