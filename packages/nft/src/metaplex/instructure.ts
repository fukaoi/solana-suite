export namespace MetaplexInstructure {
  export class Creator {
    address: string;
    verified: boolean;
    share: number;

    constructor(args: {
      address: string;
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

  export class UpdateMetadataArgs {
    instruction: number = 1;
    data: Data | null;
    // Not used by this app, just required for instruction
    updateAuthority: string | null;
    primarySaleHappened: boolean | null;
    constructor(args: {
      data?: Data;
      updateAuthority?: string;
      primarySaleHappened: boolean | null;
    }) {
      this.data = args.data ? args.data : null;
      this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
      this.primarySaleHappened = args.primarySaleHappened;
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
    }
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
      UpdateMetadataArgs,
      {
        kind: 'struct',
        fields: [
          ['instruction', 'u8'],
          ['data', {kind: 'option', type: Data}],
          ['updateAuthority', {kind: 'option', type: 'string'}],
          ['primarySaleHappened', {kind: 'option', type: 'u8'}],
        ],
      },
    ],
    [
      Creator,
      {
        kind: 'struct',
        fields: [
          ['address', [32]],
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
          ['updateAuthority', [32]],
          ['mint', [32]],
          ['data', Data],
          ['primarySaleHappened', 'u8'], // bool
          ['isMutable', 'u8'], // bool
        ],
      },
    ],
  ]);
}
