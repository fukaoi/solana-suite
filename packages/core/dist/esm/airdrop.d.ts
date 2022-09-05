import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Airdrop {
    const request: (pubkey: PublicKey, airdropAmount?: number) => Promise<Result<string, Error>>;
}
