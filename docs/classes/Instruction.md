[solana-suite](../README.md) / [Exports](../modules.md) / Instruction

# Class: Instruction

## Table of contents

### Constructors

- [constructor](Instruction.md#constructor)

### Properties

- [feePayer](Instruction.md#feepayer)
- [instructions](Instruction.md#instructions)
- [signers](Instruction.md#signers)
- [value](Instruction.md#value)

### Methods

- [submit](Instruction.md#submit)
- [batchSubmit](Instruction.md#batchsubmit)

## Constructors

### constructor

• **new Instruction**(`instructions`, `signers`, `feePayer?`, `value?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instructions` | `TransactionInstruction`[] |
| `signers` | `Signer`[] |
| `feePayer?` | `Signer` |
| `value?` | `unknown` |

#### Defined in

[src/instruction.ts:22](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L22)

## Properties

### feePayer

• `Optional` **feePayer**: `Signer`

#### Defined in

[src/instruction.ts:19](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L19)

___

### instructions

• **instructions**: `TransactionInstruction`[]

#### Defined in

[src/instruction.ts:17](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L17)

___

### signers

• **signers**: `Signer`[]

#### Defined in

[src/instruction.ts:18](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L18)

___

### value

• `Optional` **value**: `unknown`

#### Defined in

[src/instruction.ts:20](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L20)

## Methods

### submit

▸ **submit**(): `Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Defined in

[src/instruction.ts:34](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L34)

___

### batchSubmit

▸ `Static` **batchSubmit**(`arr`): `Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | [`Instruction`](Instruction.md)[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Defined in

[src/instruction.ts:54](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/instruction.ts#L54)
