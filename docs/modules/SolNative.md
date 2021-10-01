[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [transfer](SolNative.md#transfer)

## Functions

### transfer

▸ `Const` **transfer**(`sourcePubkey`, `signerSecrets`, `destPubkey`, `amount`): (`instruction?`: `TransactionInstruction`) => `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePubkey` | `string` |
| `signerSecrets` | `string`[] |
| `destPubkey` | `string` |
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

[src/sol-native.ts:12](https://github.com/fukaoi/solana-suite/blob/262aa17/src/sol-native.ts#L12)
