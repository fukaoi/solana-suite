[solana-suite](../README.md) / [Exports](../modules.md) / SplNft

# Namespace: SplNft

## Table of contents

### Functions

- [create](SplNft.md#create)
- [transfer](SplNft.md#transfer)

## Functions

### create

▸ `Const` **create**(`source`, `feePayer`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `feePayer` | `Keypair` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/nft/spl/index.ts:19](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/spl/index.ts#L19)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`): (`append`: [`AppendValue`](../interfaces/Transaction.AppendValue.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `PublicKey` |
| `dest` | `PublicKey` |

#### Returns

`fn`

▸ (`append`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `append` | [`AppendValue`](../interfaces/Transaction.AppendValue.md) |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/nft/spl/index.ts:31](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/nft/spl/index.ts#L31)
