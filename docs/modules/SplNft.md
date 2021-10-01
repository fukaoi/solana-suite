[solana-suite](../README.md) / [Exports](../modules.md) / SplNft

# Namespace: SplNft

## Table of contents

### Functions

- [create](SplNft.md#create)
- [transfer](SplNft.md#transfer)

## Functions

### create

▸ `Const` **create**(`sourceSecret`, `authority?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceSecret` | `string` |
| `authority` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nft/spl/index.ts:14](https://github.com/fukaoi/solana-suite/blob/262aa17/src/nft/spl/index.ts#L14)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `sourceSecret`, `destPubkey`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `string` |
| `sourceSecret` | `string` |
| `destPubkey` | `string` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nft/spl/index.ts:26](https://github.com/fukaoi/solana-suite/blob/262aa17/src/nft/spl/index.ts#L26)
