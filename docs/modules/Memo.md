[solana-suite](../README.md) / [Exports](../modules.md) / Memo

# Namespace: Memo

## Table of contents

### Functions

- [createInstruction](Memo.md#createinstruction)
- [decode](Memo.md#decode)
- [encode](Memo.md#encode)
- [parseInstruction](Memo.md#parseinstruction)

## Functions

### createInstruction

▸ `Const` **createInstruction**(`data`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/memo.ts:16](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/memo.ts#L16)

___

### decode

▸ `Const` **decode**(`encoded`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `encoded` | `string` |

#### Returns

`string`

#### Defined in

[src/memo.ts:11](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/memo.ts#L11)

___

### encode

▸ `Const` **encode**(`data`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `string` |

#### Returns

`Buffer`

#### Defined in

[src/memo.ts:14](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/memo.ts#L14)

___

### parseInstruction

▸ `Const` **parseInstruction**(`tx`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `ParsedConfirmedTransaction` |

#### Returns

`string`

#### Defined in

[src/memo.ts:25](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/memo.ts#L25)
