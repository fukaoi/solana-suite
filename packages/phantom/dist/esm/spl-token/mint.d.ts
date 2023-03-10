import { Result, Pubkey } from '@solana-suite/shared';
import { Phantom } from '../types';
import { InputTokenMetadata } from '@solana-suite/shared-metaplex';
export declare namespace PhantomSplToken {
    const mint: (input: InputTokenMetadata, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}
