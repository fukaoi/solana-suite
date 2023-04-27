import { Pubkey, Result } from '@solana-suite/shared';
import { Phantom } from '../types';
import { TokenMetadata, UserSideInput } from '@solana-suite/shared-metaplex';
export declare namespace PhantomSplToken {
    const mint: (input: UserSideInput.TokenMetadata, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}
