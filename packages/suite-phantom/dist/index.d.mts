import * as shared from 'shared';
import * as validator from 'validator';
import * as types_phantom from 'types/phantom';
import * as types_converter from 'types/converter';
import * as types_account from 'types/account';

declare const Metaplex: {
    mint: (input: types_converter.UserSideInput.NftMetadata, cluster: string, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error | validator.ValidatorError>>;
};

declare const PhantomSplToken: {
    mint: (input: types_converter.UserSideInput.TokenMetadata, owner: types_account.Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error>>;
    add: (tokenKey: types_account.Pubkey, owner: types_account.Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error>>;
};

export { Metaplex, PhantomSplToken };
