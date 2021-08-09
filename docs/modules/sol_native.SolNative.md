[solana-suite](../README.md) / [Exports](../modules.md) / [sol-native](sol_native.md) / SolNative

# Namespace: SolNative

[sol-native](sol_native.md).SolNative

## Table of contents

### Functions

- [transfer](sol_native.SolNative.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`sourcePubkey`, `signerSecrets`, `destPubkey`, `amount`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePubkey` | `string` |
| `signerSecrets` | `string`[] |
| `destPubkey` | `string` |
| `amount` | `number` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[sol-native.ts:12](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/sol-native.ts#L12)
