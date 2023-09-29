import { Common, Option } from '../common';
import { Pubkey } from '../../account';
import { InfraSideOutput } from '../infra-side/output';
import { UserSideInput } from '../user-side/input';

export namespace UserSideOutput {
  export type Creators = UserSideInput.Creators;
  export type Collection = { address: Pubkey; verified: boolean };
  export type Uses = Common.Uses;

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
    offchain: InfraSideOutput.Offchain;
    tokenAmount: string;
    collection?: Collection | undefined;
    creators?: Creators[] | undefined;
    uses?: Common.Uses | undefined;
    dateTime?: Date | undefined;
  };

  /////////// TOKEN //////////////
  export type TokenMetadata = {
    mint: string;
    name: string;
    symbol: string;
    uri: string;
    royalty: number;
    offchain: InfraSideOutput.Offchain;
    tokenAmount: string;
    attributes?: Common.Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: Common.Uses | undefined;
    dateTime?: Date | undefined;
  };
}
