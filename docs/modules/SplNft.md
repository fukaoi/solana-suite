[solana-suite](../README.md) / [Exports](../modules.md) / SplNft

# Namespace: SplNft

## Table of contents

### Functions

- [create](SplNft.md#create)
- [transfer](SplNft.md#transfer)

## Functions

### create

▸ `Const` **create**(`source`, `authority?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Keypair` |
| `authority` | `PublicKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nft/spl/index.ts:22](https://github.com/fukaoi/solana-suite/blob/de2b092/src/nft/spl/index.ts#L22)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `Keypair` |
| `dest` | `PublicKey` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nft/spl/index.ts:34](https://github.com/fukaoi/solana-suite/blob/de2b092/src/nft/spl/index.ts#L34)
