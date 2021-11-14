[solana-suite](../README.md) / [Exports](../modules.md) / Transaction

# Namespace: Transaction

## Table of contents

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

[src/transaction.ts:50](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/transaction.ts#L50)

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

[src/transaction.ts:20](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/transaction.ts#L20)

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

[src/transaction.ts:26](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/transaction.ts#L26)

___

### send

▸ `Const` **send**(`source`, `destination`, `signers`, `amount`): (`append?`: [`Value`](../interfaces/Append.Value.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `destination` | `PublicKey` |
| `signers` | `Keypair`[] |
| `amount` | `number` |

#### Returns

`fn`

▸ (`append?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `append?` | [`Value`](../interfaces/Append.Value.md) |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/transaction.ts:114](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/transaction.ts#L114)

___

### sendInstruction

▸ `Const` **sendInstruction**(`signers`): (`append`: [`Value`](../interfaces/Append.Value.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
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

[src/transaction.ts:59](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/transaction.ts#L59)
