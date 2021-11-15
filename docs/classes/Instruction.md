[solana-suite](../README.md) / [Exports](../modules.md) / Instruction

# Class: Instruction

## Table of contents

### Constructors

- [constructor](Instruction.md#constructor)

### Properties

- [data](Instruction.md#data)
- [feePayer](Instruction.md#feepayer)
- [instructions](Instruction.md#instructions)
- [signers](Instruction.md#signers)

### Methods

- [submit](Instruction.md#submit)
- [batchSubmit](Instruction.md#batchsubmit)

## Constructors

### constructor

• **new Instruction**(`instructions`, `signers`, `feePayer?`, `data?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `instructions` | `TransactionInstruction`[] |
| `signers` | `Signer`[] |
| `feePayer?` | `Signer` |
| `data?` | `unknown` |

#### Defined in

[src/instruction.ts:17](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L17)

## Properties

### data

• `Optional` **data**: `unknown`

#### Defined in

[src/instruction.ts:15](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L15)

___

### feePayer

• `Optional` **feePayer**: `Signer`

#### Defined in

[src/instruction.ts:14](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L14)

___

### instructions

• **instructions**: `TransactionInstruction`[]

#### Defined in

[src/instruction.ts:12](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L12)

___

### signers

• **signers**: `Signer`[]

#### Defined in

[src/instruction.ts:13](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L13)

## Methods

### submit

▸ **submit**(): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/instruction.ts:29](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L29)

___

### batchSubmit

▸ `Static` **batchSubmit**(`arr`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | [`Instruction`](Instruction.md)[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/instruction.ts:49](https://github.com/fukaoi/solana-suite/blob/077409e/src/instruction.ts#L49)
