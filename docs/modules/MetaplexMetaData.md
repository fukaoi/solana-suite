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

▸ `Const` **create**(`data`, `tokenKey`, `mintAuthorityKey`, `updateAuthority`, `feePayer`): `Promise`<[`Result`](../modules.md#result)<`TransactionInstruction`[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `tokenKey` | `PublicKey` |
| `mintAuthorityKey` | `PublicKey` |
| `updateAuthority` | `PublicKey` |
| `feePayer` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`TransactionInstruction`[], `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:192](https://github.com/fukaoi/solana-suite/blob/62f455f/src/nft/metaplex/metadata.ts#L192)

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

[src/nft/metaplex/metadata.ts:160](https://github.com/fukaoi/solana-suite/blob/62f455f/src/nft/metaplex/metadata.ts#L160)

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

[src/nft/metaplex/metadata.ts:135](https://github.com/fukaoi/solana-suite/blob/62f455f/src/nft/metaplex/metadata.ts#L135)

___

### update

▸ `Const` **update**(`data`, `newUpdateAuthority`, `primarySaleHappened`, `tokenKey`, `updateAuthority`, `signers`): `Promise`<[`Result`](../modules.md#result)<`TransactionInstruction`[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `newUpdateAuthority` | `undefined` \| ``null`` \| `PublicKey` |
| `primarySaleHappened` | `undefined` \| ``null`` \| `boolean` |
| `tokenKey` | `PublicKey` |
| `updateAuthority` | `PublicKey` |
| `signers` | `Signer`[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`TransactionInstruction`[], `Error`\>\>

#### Defined in

[src/nft/metaplex/metadata.ts:217](https://github.com/fukaoi/solana-suite/blob/62f455f/src/nft/metaplex/metadata.ts#L217)
