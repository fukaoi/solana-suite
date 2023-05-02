import { _Shared, Option } from '../shared';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';

export namespace UserSideOutput {
  export type Creators = UserSideInput.Creators;
  export type Collection = { address: Pubkey; verified: boolean };
  export type Uses = _Shared.Uses;

  /////////// NFT //////////////
  export type NftMetadata = {
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

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: _Shared.Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: _Shared.Uses | undefined;
    offchain: InfraSideOutput.Offchain;
  };
}
