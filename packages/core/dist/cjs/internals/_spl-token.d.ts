import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Internals_SplToken {
    const findAssociatedTokenAddress: (mint: PublicKey, owner: PublicKey) => Promise<Result<PublicKey, Error>>;
    const calculateAmount: (amount: number, mintDecimal: number) => number;
}
