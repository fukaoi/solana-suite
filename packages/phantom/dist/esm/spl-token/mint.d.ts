import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { Phantom } from '../types';
export declare namespace SplTokenPhantom {
    const mint: (owner: PublicKey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}