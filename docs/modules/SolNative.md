[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [transfer](SolNative.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`source`, `signers`, `destination`, `amount`): (`instruction?`: `TransactionInstruction`) => `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `signers` | `Keypair`[] |
| `destination` | `PublicKey` |
| `amount` | `number` |

#### Returns

`fn`

▸ (`instruction?`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instruction?` | `TransactionInstruction` |

##### Returns

`Promise`<`string`\>

#### Defined in

[src/sol-native.ts:12](https://github.com/fukaoi/solana-suite/blob/17adcd0/src/sol-native.ts#L12)
