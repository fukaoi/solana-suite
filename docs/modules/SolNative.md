[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [transfer](SolNative.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`source`, `signers`, `destination`, `amount`): (`instruction?`: `TransactionInstruction`) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `signers` | `Keypair`[] |
| `destination` | `PublicKey` |
| `amount` | `number` |

#### Returns

`fn`

▸ (`instruction?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instruction?` | `TransactionInstruction` |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/sol-native.ts:11](https://github.com/fukaoi/solana-suite/blob/1200997/src/sol-native.ts#L11)
