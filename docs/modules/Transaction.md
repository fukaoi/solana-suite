[solana-suite](../README.md) / [Exports](../modules.md) / Transaction

# Namespace: Transaction

## Table of contents

### Functions

- [confirmedSig](Transaction.md#confirmedsig)
- [get](Transaction.md#get)
- [getAll](Transaction.md#getall)
- [send](Transaction.md#send)
- [sendInstructions](Transaction.md#sendinstructions)

## Functions

### confirmedSig

▸ `Const` **confirmedSig**(`signature`, `commitment?`): `Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signature` | `string` | `undefined` |
| `commitment` | `Commitment` | `'finalized'` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`unknown`, `Error`\>\>

#### Defined in

[src/transaction.ts:48](https://github.com/fukaoi/solana-suite/blob/1200997/src/transaction.ts#L48)

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

[src/transaction.ts:19](https://github.com/fukaoi/solana-suite/blob/1200997/src/transaction.ts#L19)

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

[src/transaction.ts:25](https://github.com/fukaoi/solana-suite/blob/1200997/src/transaction.ts#L25)

___

### send

▸ `Const` **send**(`source`, `signers`, `destination`, `amount`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `signers` | `Signer`[] |
| `destination` | `PublicKey` |
| `amount` | `number` |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/transaction.ts:81](https://github.com/fukaoi/solana-suite/blob/1200997/src/transaction.ts#L81)

___

### sendInstructions

▸ `Const` **sendInstructions**(`signers`, `instructions`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | `Keypair`[] |
| `instructions` | `TransactionInstruction`[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/transaction.ts:57](https://github.com/fukaoi/solana-suite/blob/1200997/src/transaction.ts#L57)
