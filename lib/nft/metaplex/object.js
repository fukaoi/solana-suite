"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexObject = void 0;
var MetaplexObject;
(function (MetaplexObject) {
    class Creator {
        constructor(args) {
            this.address = args.address;
            this.verified = args.verified;
            this.share = args.share;
        }
    }
    MetaplexObject.Creator = Creator;
    class Data {
        constructor(args) {
            this.name = args.name;
            this.symbol = args.symbol;
            this.uri = args.uri;
            this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
            this.creators = args.creators;
        }
    }
    MetaplexObject.Data = Data;
    class CreateMetadataArgs {
        constructor(args) {
            this.instruction = 0;
            this.data = args.data;
            this.isMutable = args.isMutable;
        }
    }
    MetaplexObject.CreateMetadataArgs = CreateMetadataArgs;
    class UpdateMetadataArgs {
        constructor(args) {
            this.instruction = 1;
            this.data = args.data ? args.data : null;
            this.updateAuthority = args.updateAuthority ? args.updateAuthority : null;
            this.primarySaleHappened = args.primarySaleHappened;
        }
    }
    MetaplexObject.UpdateMetadataArgs = UpdateMetadataArgs;
    let MetadataKey;
    (function (MetadataKey) {
        MetadataKey[MetadataKey["Uninitialized"] = 0] = "Uninitialized";
        MetadataKey[MetadataKey["MetadataV1"] = 4] = "MetadataV1";
        MetadataKey[MetadataKey["EditionV1"] = 1] = "EditionV1";
        MetadataKey[MetadataKey["MasterEditionV1"] = 2] = "MasterEditionV1";
        MetadataKey[MetadataKey["MasterEditionV2"] = 6] = "MasterEditionV2";
        MetadataKey[MetadataKey["EditionMarker"] = 7] = "EditionMarker";
    })(MetadataKey = MetaplexObject.MetadataKey || (MetaplexObject.MetadataKey = {}));
    class Metadata {
        constructor(args) {
            this.key = MetadataKey.MetadataV1;
            this.updateAuthority = args.updateAuthority;
            this.mint = args.mint;
            this.data = args.data;
            this.primarySaleHappened = args.primarySaleHappened;
            this.isMutable = args.isMutable;
        }
    }
    MetaplexObject.Metadata = Metadata;
    MetaplexObject.SCHEMA = new Map([
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
                    ['data', { kind: 'option', type: Data }],
                    ['updateAuthority', { kind: 'option', type: 'string' }],
                    ['primarySaleHappened', { kind: 'option', type: 'u8' }],
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
                    ['creators', { kind: 'option', type: [Creator] }],
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
                    ['primarySaleHappened', 'u8'],
                    ['isMutable', 'u8'], // bool
                ],
            },
        ],
    ]);
})(MetaplexObject = exports.MetaplexObject || (exports.MetaplexObject = {}));
