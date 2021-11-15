[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [multisigTransfer](SolNative.md#multisigtransfer)
- [transfer](SolNative.md#transfer)

## Functions

### multisigTransfer

▸ `Const` **multisigTransfer**(`owner`, `dest`, `signers`, `amountSol`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `PublicKey` |
| `dest` | `PublicKey` |
| `signers` | `Signer`[] |
| `amountSol` | `number` |
| `feePayer?` | `Signer` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/sol-native.ts:21](https://github.com/fukaoi/solana-suite/blob/077409e/src/sol-native.ts#L21)

___

### transfer

▸ `Const` **transfer**(`source`, `destination`, `signers`, `amountSol`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `destination` | `PublicKey` |
| `signers` | `Signer`[] |
| `amountSol` | `number` |
| `feePayer?` | `Signer` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/sol-native.ts:96](https://github.com/fukaoi/solana-suite/blob/077409e/src/sol-native.ts#L96)
