import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace MetaplexAccount {
    const findMetaplexAssocaiatedTokenAddress: (mint: PublicKey) => Promise<Result<PublicKey, Error>>;
}
