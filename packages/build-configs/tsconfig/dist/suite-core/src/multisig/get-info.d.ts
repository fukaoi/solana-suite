import { Pubkey, Result } from 'shared';
import { LayoutObject } from '@solana/buffer-layout';
export declare namespace Multisig {
    const getInfo: (multisig: Pubkey) => Promise<Result<LayoutObject, Error>>;
}
