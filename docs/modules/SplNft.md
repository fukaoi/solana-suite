[solana-suite](../README.md) / [Exports](../modules.md) / SplNft

# Namespace: SplNft

## Table of contents

### Functions

- [create](SplNft.md#create)
- [transfer](SplNft.md#transfer)

## Functions

### create

▸ `Const` **create**(`source`, `authority?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `source` | `Keypair` | `undefined` |
| `authority` | `PublicKey` | `source.publicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/nft/spl/index.ts:20](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/nft/spl/index.ts#L20)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `instruction?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `Keypair` |
| `dest` | `PublicKey` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/nft/spl/index.ts:32](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/nft/spl/index.ts#L32)
