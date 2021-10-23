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

▸ `Const` **create**(`data`, `tokenKey`, `payer`, `mintAuthorityKey?`, `updateAuthority?`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) | `undefined` |
| `tokenKey` | `PublicKey` | `undefined` |
| `payer` | `PublicKey` | `undefined` |
| `mintAuthorityKey` | `PublicKey` | `payer` |
| `updateAuthority` | `PublicKey` | `payer` |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:64](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/metadata.ts#L64)

___

### getByOwner

▸ `Const` **getByOwner**(`owner`): `Promise`<[`Result`](../modules.md#result)<[`Format`](../interfaces/Metaplex.Format.md)[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Format`](../interfaces/Metaplex.Format.md)[], `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:38](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/metadata.ts#L38)

___

### getByTokenKey

▸ `Const` **getByTokenKey**(`tokenKey`): `Promise`<[`Result`](../modules.md#result)<[`Format`](../interfaces/Metaplex.Format.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Format`](../interfaces/Metaplex.Format.md), `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:17](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/metadata.ts#L17)

___

### update

▸ `Const` **update**(`data`, `newUpdateAuthority`, `primarySaleHappened`, `tokenKey`, `updateAuthority`, `signers`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

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

▸ (`instructions?`): `Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`PublicKey` \| `TransactionInstruction`[], `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:126](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/metaplex/metadata.ts#L126)
