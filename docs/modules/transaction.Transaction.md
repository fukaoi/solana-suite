[solana-suite](../README.md) / [Exports](../modules.md) / [transaction](transaction.md) / Transaction

# Namespace: Transaction

[transaction](transaction.md).Transaction

## Table of contents

### Functions

- [get](transaction.Transaction.md#get)
- [send](transaction.Transaction.md#send)
- [sendMySelf](transaction.Transaction.md#sendmyself)

## Functions

### get

▸ `Const` **get**(`signature`): `Promise`<``null`` \| `TransactionResponse`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signature` | `string` |

#### Returns

`Promise`<``null`` \| `TransactionResponse`\>

#### Defined in

[transaction.ts:17](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/transaction.ts#L17)

___

### send

▸ `Const` **send**(`sourcePublicKey`, `signers`, `destPublicKey`, `amount`): `Promise`<`fn`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePublicKey` | `PublicKey` |
| `signers` | `Signer`[] |
| `destPublicKey` | `PublicKey` |
| `amount` | `number` |

#### Returns

`Promise`<`fn`\>

#### Defined in

[transaction.ts:33](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/transaction.ts#L33)

___

### sendMySelf

▸ `Const` **sendMySelf**(`signer`, `instruction`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signer` | `Keypair` |
| `instruction` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[transaction.ts:20](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/transaction.ts#L20)
