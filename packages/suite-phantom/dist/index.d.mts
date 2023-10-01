import * as shared from 'shared';
import * as validator from 'validator';
import * as types_phantom from 'types/phantom';
import * as types_converter from 'types/converter';

declare const Metaplex: {
    mint: (input: types_converter.UserSideInput.NftMetadata, cluster: string, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error | validator.ValidatorError>>;
};

declare const PhantomSplToken: {
    mint: (input: types_converter.UserSideInput.TokenMetadata, owner: string, cluster: string, totalAmount: number, mintDecimal: number, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error>>;
    add: (tokenKey: string, owner: string, cluster: string, totalAmount: number, mintDecimal: number, phantom: types_phantom.Phantom) => Promise<shared.Result<string, Error>>;
};

export { Metaplex, PhantomSplToken };
