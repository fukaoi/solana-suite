import { Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';
export declare namespace UserSideOutput {
    type Creators = UserSideInput.Creators;
    type Collection = {
        address: Pubkey;
        verified: boolean;
    };
    type Uses = _Same.Uses;
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
        uses?: _Same.Uses | undefined;
        offchain: InfraSideOutput.Offchain;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        uri: string;
        sellerFeeBasisPoints: number;
        attributes?: _Same.Attribute | undefined;
        creators?: Creators[] | undefined;
        uses?: _Same.Uses | undefined;
        offchain: InfraSideOutput.Offchain;
    };
}
