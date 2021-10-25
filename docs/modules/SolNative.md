[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [transfer](SolNative.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`source`, `destination`, `amount`): (`append`: [`AppendValue`](../interfaces/Transaction.AppendValue.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `destination` | `PublicKey` |
| `amount` | `number` |

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

[src/sol-native.ts:9](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/sol-native.ts#L9)
