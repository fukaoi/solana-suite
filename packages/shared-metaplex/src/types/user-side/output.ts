import { Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';

export namespace UserSideOutput {
  export type Creators = UserSideInput.Creators;
  export type Collection = { address: Pubkey; verified: boolean };
  export type Uses = _Same.Uses;

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
    uses?: _Same.Uses | undefined;
    offchain: InfraSideOutput.Offchain;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
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
