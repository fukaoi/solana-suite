import { Result } from '@solana-suite/shared';
import { PublicKey } from '@solana/web3.js';
import { LayoutObject } from '@solana/buffer-layout';
export declare namespace Multisig {
    const getInfo: (multisig: PublicKey) => Promise<Result<LayoutObject, Error>>;
}
