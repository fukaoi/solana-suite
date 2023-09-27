import { Result, Pubkey } from 'shared';
export declare namespace Airdrop {
    const request: (pubkey: Pubkey, airdropAmount?: number) => Promise<Result<string, Error>>;
}
