import { Pubkey, Result } from '@solana-suite/shared';
import { Phantom } from '../types';
export declare namespace PhantomSplToken {
    const add: (tokenKey: Pubkey, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}
