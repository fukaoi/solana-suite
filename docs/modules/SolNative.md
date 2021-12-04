[solana-suite](../README.md) / [Exports](../modules.md) / SolNative

# Namespace: SolNative

## Table of contents

### Functions

- [transfer](SolNative.md#transfer)
- [transferWithMultisig](SolNative.md#transferwithmultisig)

## Functions

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

[src/sol-native.ts:95](https://github.com/fukaoi/solana-suite/blob/3d6e966/src/sol-native.ts#L95)

___

### transferWithMultisig

▸ `Const` **transferWithMultisig**(`owner`, `dest`, `signers`, `amountSol`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

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

[src/sol-native.ts:20](https://github.com/fukaoi/solana-suite/blob/3d6e966/src/sol-native.ts#L20)
