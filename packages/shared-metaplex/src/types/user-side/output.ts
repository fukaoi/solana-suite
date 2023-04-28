import { Option } from '../shared';
import { _Same } from '../_same';
import { Pubkey } from '@solana-suite/shared';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';

export namespace UserSideOutput {
  export type Creators = UserSideInput.Creators;
  export type Collection = Option<{ address: Pubkey; verified: boolean }> | undefined;

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
    creators: Creators[];
    editionNonce: Option<number>;
    collection: Collection;
    uses: Option<_Same.Uses>;
    onchain: InfraSideOutput.Offchain;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    attributes?: _Same.Attribute;
    creators?: Creators[];
    uses?: Option<_Same.Uses>;
  };
}
