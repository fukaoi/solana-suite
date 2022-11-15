import { Result } from '@solana-suite/shared';
import { PublicKey } from '@solana/web3.js';
export declare namespace Multisig {
    const isAddress: (multisig: PublicKey) => Promise<Result<boolean, Error>>;
}
