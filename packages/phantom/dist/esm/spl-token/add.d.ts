import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { Phantom } from '../types';
export declare namespace PhantomSplToken {
    const add: (tokenKey: PublicKey, owner: PublicKey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}
