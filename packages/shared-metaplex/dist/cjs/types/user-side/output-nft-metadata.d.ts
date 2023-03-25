import { Pubkey } from '@solana-suite/shared';
import { COption, User, _Common } from '../shared';
export type OCollection = COption<{
    address: Pubkey;
    verified: boolean;
}>;
export type OutputNftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    creators: User.Creators[];
    editionNonce: COption<number>;
    collection: OCollection;
    uses: COption<_Common.Uses>;
};
