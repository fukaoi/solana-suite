[solana-suite](../README.md) / [Exports](../modules.md) / MetaplexSerialize

# Namespace: MetaplexSerialize

## Table of contents

### Functions

- [decode](MetaplexSerialize.md#decode)
- [serializeCreateArgs](MetaplexSerialize.md#serializecreateargs)
- [serializeUpdateArgs](MetaplexSerialize.md#serializeupdateargs)

## Functions

### decode

▸ `Const` **decode**(`data`): [`Format`](../interfaces/Metaplex.Format.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Buffer` |

#### Returns

[`Format`](../interfaces/Metaplex.Format.md)

#### Defined in

[src/nft/metaplex/serialize.ts:31](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/serialize.ts#L31)

___

### serializeCreateArgs

▸ `Const` **serializeCreateArgs**(`data`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |

#### Returns

`Buffer`

#### Defined in

[src/nft/metaplex/serialize.ts:8](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/serialize.ts#L8)

___

### serializeUpdateArgs

▸ `Const` **serializeUpdateArgs**(`data`, `newUpdateAuthority`, `primarySaleHappened`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `newUpdateAuthority` | `undefined` \| ``null`` \| `PublicKey` |
| `primarySaleHappened` | `undefined` \| ``null`` \| `boolean` |

#### Returns

`Buffer`

#### Defined in

[src/nft/metaplex/serialize.ts:13](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/serialize.ts#L13)
