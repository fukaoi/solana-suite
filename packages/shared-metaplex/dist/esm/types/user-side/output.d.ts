import { _Shared, Option } from '../shared';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';
export declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey;
        verified: boolean;
    };
    type Uses = _Shared.Uses;
    type NftMetadata = {
        mint: string;
        updateAuthority: string;
        royalty: number;
        name: string;
        symbol: string;
        uri: string;
        isMutable: boolean;
        primarySaleHappened: boolean;
        editionNonce: Option<number>;
        collection?: Collection | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
        created_at?: number | undefined;
        offchain: InfraSideOutput.Offchain;
    };
    type TokenMetadata = {
        mint: string;
        name: string;
        symbol: string;
        uri: string;
        royalty: number;
        attributes?: _Shared.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: _Shared.Uses | undefined;
        offchain: InfraSideOutput.Offchain;
    };
}
