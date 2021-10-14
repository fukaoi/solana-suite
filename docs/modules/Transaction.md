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

▸ `Const` **confirmedSig**(`signature`, `commitment?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `signature` | `string` | `undefined` |
| `commitment` | `Commitment` | `'max'` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/transaction.ts:38](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/transaction.ts#L38)

___

### get

▸ `Const` **get**(`signature`): `Promise`<``null`` \| `ParsedConfirmedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Returns

`Promise`<``null`` \| `ParsedConfirmedTransaction`\>

#### Defined in

[src/transaction.ts:19](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/transaction.ts#L19)

___

### getAll

▸ `Const` **getAll**(`pubkey`, `limit?`): `Promise`<`ParsedConfirmedTransaction`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `limit?` | `number` |

#### Returns

`Promise`<`ParsedConfirmedTransaction`[]\>

#### Defined in

[src/transaction.ts:22](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/transaction.ts#L22)

___

### send

▸ `Const` **send**(`source`, `signers`, `destination`, `amount`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `signers` | `Signer`[] |
| `destination` | `PublicKey` |
| `amount` | `number` |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<`string`\>

#### Defined in

[src/transaction.ts:60](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/transaction.ts#L60)

___

### sendInstructions

▸ `Const` **sendInstructions**(`signers`, `instructions`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | `Keypair`[] |
| `instructions` | `TransactionInstruction`[] |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/transaction.ts:42](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/transaction.ts#L42)
