[solana-suite](../README.md) / [Exports](../modules.md) / Transaction

# Namespace: Transaction

## Table of contents

### Functions

- [confirmedSig](Transaction.md#confirmedsig)
- [get](Transaction.md#get)
- [getAll](Transaction.md#getall)

## Functions

### confirmedSig

▸ `Const` **confirmedSig**(`signature`, `commitment?`): `Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signature` | `string` | `undefined` |
| `commitment` | `Commitment` | `Constants.COMMITMENT` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Defined in

[src/transaction.ts:44](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/transaction.ts#L44)

___

### get

▸ `Const` **get**(`signature`): `Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Defined in

[src/transaction.ts:14](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/transaction.ts#L14)

___

### getAll

▸ `Const` **getAll**(`pubkey`, `limit?`): `Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `limit?` | `number` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Defined in

[src/transaction.ts:20](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/transaction.ts#L20)
