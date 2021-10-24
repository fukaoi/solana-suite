[solana-suite](../README.md) / [Exports](../modules.md) / Transaction

# Namespace: Transaction

## Table of contents

### Interfaces

- [AppendValue](../interfaces/Transaction.AppendValue.md)

### Functions

- [confirmedSig](Transaction.md#confirmedsig)
- [get](Transaction.md#get)
- [getAll](Transaction.md#getall)
- [send](Transaction.md#send)
- [sendInstruction](Transaction.md#sendinstruction)

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

[src/transaction.ts:56](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/transaction.ts#L56)

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

[src/transaction.ts:26](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/transaction.ts#L26)

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

[src/transaction.ts:32](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/transaction.ts#L32)

___

### send

▸ `Const` **send**(`source`, `destination`, `amount`): (`append`: [`AppendValue`](../interfaces/Transaction.AppendValue.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

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

[src/transaction.ts:91](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/transaction.ts#L91)

___

### sendInstruction

▸ `Const` **sendInstruction**(): (`append`: [`AppendValue`](../interfaces/Transaction.AppendValue.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

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

[src/transaction.ts:65](https://github.com/fukaoi/solana-suite/blob/6dc9bbe/src/transaction.ts#L65)
