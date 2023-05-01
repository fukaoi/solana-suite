import { Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';

export namespace UserSideOutput {
  export type Creators = UserSideInput.Creators;
  export type Collection = { address: Pubkey; verified: boolean };

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
    collection?: Option<Collection>;
    creators?: Option<Creators[]>;
    uses?: Option<_Same.Uses>;
    offchain: InfraSideOutput.Offchain;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: Option<_Same.Attribute>;
    creators?: Option<Creators[]>;
    uses?: Option<_Same.Uses>;
    offchain: InfraSideOutput.Offchain;
  };
}
