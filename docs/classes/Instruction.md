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
- [createLayoutPubKey](Instruction.md#createlayoutpubkey)
- [createLayoutUint64](Instruction.md#createlayoutuint64)
- [pubkeyToBuffer](Instruction.md#pubkeytobuffer)

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

[src/instruction.ts:26](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L26)

## Properties

### feePayer

• `Optional` **feePayer**: `Signer`

#### Defined in

[src/instruction.ts:23](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L23)

___

### instructions

• **instructions**: `TransactionInstruction`[]

#### Defined in

[src/instruction.ts:21](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L21)

___

### signers

• **signers**: `Signer`[]

#### Defined in

[src/instruction.ts:22](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L22)

___

### value

• `Optional` **value**: `unknown`

#### Defined in

[src/instruction.ts:24](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L24)

## Methods

### submit

▸ **submit**(): `Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`InstructionSubmit`](../interfaces/InstructionSubmit.md), `Error`\>\>

#### Defined in

[src/instruction.ts:38](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L38)

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

[src/instruction.ts:58](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L58)

___

### createLayoutPubKey

▸ `Static` **createLayoutPubKey**(`property?`): `Blob`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `property` | `string` | `'publicKey'` |

#### Returns

`Blob`

#### Defined in

[src/instruction.ts:97](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L97)

___

### createLayoutUint64

▸ `Static` **createLayoutUint64**(`property?`): `Blob`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `property` | `string` | `'uint64'` |

#### Returns

`Blob`

#### Defined in

[src/instruction.ts:92](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L92)

___

### pubkeyToBuffer

▸ `Static` **pubkeyToBuffer**(`publicKey`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `publicKey` | `PublicKey` |

#### Returns

`Buffer`

#### Defined in

[src/instruction.ts:87](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/instruction.ts#L87)
