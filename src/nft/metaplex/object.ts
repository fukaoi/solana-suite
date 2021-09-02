import {
  PublicKey,
} from '@solana/web3.js';

export namespace MetaplexObject {
  export class Creator {
    address: PublicKey;
    verified: boolean;
    share: number;

    constructor(args: {
      address: PublicKey;
      verified: boolean;
      share: number;
    }) {
      this.address = args.address;
      this.verified = args.verified;
      this.share = args.share;
    }
  }

  export class Data {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: Creator[] | null;
    constructor(args: {
      name: string;
      symbol: string;
      uri: string;
      sellerFeeBasisPoints: number;
      creators: Creator[] | null;
    }) {
      this.name = args.name;
      this.symbol = args.symbol;
      this.uri = args.uri;
      this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
      this.creators = args.creators;
    }
  }

  export class CreateMetadataArgs {
    instruction: number = 0;
    data: Data;
    isMutable: boolean;

    constructor(args: {data: Data; isMutable: boolean}) {
      this.data = args.data;
      this.isMutable = args.isMutable;
    }
  }

  export enum MetadataKey {
    Uninitialized = 0,
    MetadataV1 = 4,
    EditionV1 = 1,
    MasterEditionV1 = 2,
    MasterEditionV2 = 6,
    EditionMarker = 7,
  }

  export class Metadata {
    key: MetadataKey;
    updateAuthority: string;
    mint: string;
    data: Data;
    primarySaleHappened: boolean;
    isMutable: boolean;
    editionNonce: number | null;

    masterEdition?: string;
    edition?: string;

    constructor(args: {
      updateAuthority: string;
      mint: string;
      data: Data;
      primarySaleHappened: boolean;
      isMutable: boolean;
      editionNonce: number | null;
    }) {
      this.key = MetadataKey.MetadataV1;
      this.updateAuthority = args.updateAuthority;
      this.mint = args.mint;
      this.data = args.data;
      this.primarySaleHappened = args.primarySaleHappened;
      this.isMutable = args.isMutable;
      this.editionNonce = args.editionNonce;
    }

    // public async init() {
    // const edition = await getEdition(this.mint);
    // this.edition = edition;
    // this.masterEdition = edition;
    // }
  }

  export const SCHEMA = new Map<any, any>([
    [
      CreateMetadataArgs,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['data', Data],
          ['isMutable', 'u8'], // bool
        ],
      },
    ],
    [
      Creator,
      {
        kind: 'struct',
        fields: [
          ['address', 'pubkeyAsString'],
          ['verified', 'u8'],
          ['share', 'u8'],
        ],
      },
    ],
    [
      Data,
      {
        kind: 'struct',
        fields: [
          ['name', 'string'],
          ['symbol', 'string'],
          ['uri', 'string'],
          ['sellerFeeBasisPoints', 'u16'],
          ['creators', {kind: 'option', type: [Creator]}],
        ],
      },
    ],
    [
      Metadata,
      {
        kind: 'struct',
        fields: [
          ['key', 'u8'],
          ['updateAuthority', 'pubkeyAsString'],
          ['mint', 'pubkeyAsString'],
          ['data', Data],
          ['primarySaleHappened', 'u8'], // bool
          ['isMutable', 'u8'], // bool
        ],
      },
    ],
  ]);
}
