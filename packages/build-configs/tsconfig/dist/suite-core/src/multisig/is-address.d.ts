import { Pubkey, Result } from 'shared';
export declare namespace Multisig {
    const isAddress: (multisig: Pubkey) => Promise<Result<boolean, Error>>;
}
