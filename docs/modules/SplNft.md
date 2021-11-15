[solana-suite](../README.md) / [Exports](../modules.md) / SplNft

# Namespace: SplNft

## Table of contents

### Functions

- [transfer](SplNft.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `signers`): (`append`: [`Value`](../interfaces/Append.Value.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `PublicKey` |
| `dest` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`fn`

▸ (`append`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `append` | [`Value`](../interfaces/Append.Value.md) |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/nft/spl/index.ts:23](https://github.com/fukaoi/solana-suite/blob/077409e/src/nft/spl/index.ts#L23)
