[solana-suite](../README.md) / [Exports](../modules.md) / Transaction

# Namespace: Transaction

## Table of contents

### Functions

- [get](Transaction.md#get)
- [getAll](Transaction.md#getall)
- [send](Transaction.md#send)
- [sendInstructions](Transaction.md#sendinstructions)
- [subscribeAccount](Transaction.md#subscribeaccount)
- [unsubscribeAccount](Transaction.md#unsubscribeaccount)

## Functions

### get

▸ `Const` **get**(`signature`): `Promise`<``null`` \| `ParsedConfirmedTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Returns

`Promise`<``null`` \| `ParsedConfirmedTransaction`\>

#### Defined in

[src/transaction.ts:19](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L19)

___

### getAll

▸ `Const` **getAll**(`pubkeyStr`): `Promise`<`ParsedConfirmedTransaction`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkeyStr` | `string` |

#### Returns

`Promise`<`ParsedConfirmedTransaction`[]\>

#### Defined in

[src/transaction.ts:22](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L22)

___

### send

▸ `Const` **send**(`sourcePublicKey`, `signers`, `destPublicKey`, `amount`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePublicKey` | `PublicKey` |
| `signers` | `Signer`[] |
| `destPublicKey` | `PublicKey` |
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

[src/transaction.ts:56](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L56)

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

[src/transaction.ts:39](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L39)

___

### subscribeAccount

▸ `Const` **subscribeAccount**(`pubkey`, `callback`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `string` |
| `callback` | `AccountChangeCallback` |

#### Returns

`number`

#### Defined in

[src/transaction.ts:33](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L33)

___

### unsubscribeAccount

▸ `Const` **unsubscribeAccount**(`subscribeId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscribeId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/transaction.ts:36](https://github.com/fukaoi/solana-suite/blob/262aa17/src/transaction.ts#L36)
