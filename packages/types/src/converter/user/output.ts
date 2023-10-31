import { Common, Option } from '../common';
import { Pubkey } from '../../account';
import { InfraOutput } from '../infra/output';
import { UserInput } from '../user/input';

export namespace UserOutput {
  export type Creators = UserInput.Creators;
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
    offchain: InfraOutput.Offchain;
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
    offchain: InfraOutput.Offchain;
    tokenAmount: string;
    attributes?: Common.Attribute | undefined;
    creators?: Creators[] | undefined;
    uses?: Common.Uses | undefined;
    dateTime?: Date | undefined;
  };
}
