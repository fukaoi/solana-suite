[solana-suite](../README.md) / [Exports](../modules.md) / MetaplexMetaData

# Namespace: MetaplexMetaData

## Table of contents

### Functions

- [create](MetaplexMetaData.md#create)
- [getByOwner](MetaplexMetaData.md#getbyowner)
- [getByTokenKey](MetaplexMetaData.md#getbytokenkey)
- [update](MetaplexMetaData.md#update)

## Functions

### create

▸ `Const` **create**(`data`, `tokenKey`, `payer`, `mintAuthorityKey?`, `updateAuthority?`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`TransactionInstruction`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `tokenKey` | `PublicKey` |
| `payer` | `PublicKey` |
| `mintAuthorityKey` | `PublicKey` |
| `updateAuthority` | `PublicKey` |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<`TransactionInstruction`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<`TransactionInstruction`[]\>

#### Defined in

[src/nft/metaplex/metadata.ts:46](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/metadata.ts#L46)

___

### getByOwner

▸ `Const` **getByOwner**(`owner`): `Promise`<[`Format`](../interfaces/Metaplex.Format.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `PublicKey` |

#### Returns

`Promise`<[`Format`](../interfaces/Metaplex.Format.md)[]\>

#### Defined in

[src/nft/metaplex/metadata.ts:29](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/metadata.ts#L29)

___

### getByTokenKey

▸ `Const` **getByTokenKey**(`tokenKey`): `Promise`<[`Format`](../interfaces/Metaplex.Format.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<[`Format`](../interfaces/Metaplex.Format.md)\>

#### Defined in

[src/nft/metaplex/metadata.ts:17](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/metadata.ts#L17)

___

### update

▸ `Const` **update**(`data`, `newUpdateAuthority`, `primarySaleHappened`, `tokenKey`, `updateAuthority`, `signers`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`TransactionInstruction`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `newUpdateAuthority` | `undefined` \| ``null`` \| `PublicKey` |
| `primarySaleHappened` | `undefined` \| ``null`` \| `boolean` |
| `tokenKey` | `PublicKey` |
| `updateAuthority` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<`TransactionInstruction`[]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<`TransactionInstruction`[]\>

#### Defined in

[src/nft/metaplex/metadata.ts:106](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/metadata.ts#L106)
