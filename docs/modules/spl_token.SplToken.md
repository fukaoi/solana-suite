[solana-suite](../README.md) / [Exports](../modules.md) / [spl-token](spl_token.md) / SplToken

# Namespace: SplToken

[spl-token](spl_token.md).SplToken

## Table of contents

### Functions

- [create](spl_token.SplToken.md#create)
- [createNft](spl_token.SplToken.md#createnft)
- [setMetaData](spl_token.SplToken.md#setmetadata)
- [transfer](spl_token.SplToken.md#transfer)
- [transferNft](spl_token.SplToken.md#transfernft)

## Functions

### create

▸ `Const` **create**(`sourceSecret`, `totalAmount`, `decimal`, `authority?`): `Promise`<`CreateResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceSecret` | `string` |
| `totalAmount` | `number` |
| `decimal` | `number` |
| `authority` | `string` |

#### Returns

`Promise`<`CreateResponse`\>

#### Defined in

[spl-token.ts:26](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/spl-token.ts#L26)

___

### createNft

▸ `Const` **createNft**(`sourceSecret`, `authority?`): `Promise`<`CreateResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceSecret` | `string` |
| `authority` | `string` |

#### Returns

`Promise`<`CreateResponse`\>

#### Defined in

[spl-token.ts:57](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/spl-token.ts#L57)

___

### setMetaData

▸ `Const` **setMetaData**(`name`, `description`, `image`, `attributes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `description` | `string` |
| `image` | `string` |
| `attributes` | `string`[] |

#### Returns

`void`

#### Defined in

[spl-token.ts:119](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/spl-token.ts#L119)

___

### transfer

▸ `Const` **transfer**(`tokenId`, `sourceSecret`, `destination`, `amount`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |
| `sourceSecret` | `string` |
| `destination` | `string` |
| `amount` | `number` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[spl-token.ts:84](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/spl-token.ts#L84)

___

### transferNft

▸ `Const` **transferNft**(`tokenId`, `sourceSecret`, `destPubkey`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |
| `sourceSecret` | `string` |
| `destPubkey` | `string` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[spl-token.ts:69](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/spl-token.ts#L69)
