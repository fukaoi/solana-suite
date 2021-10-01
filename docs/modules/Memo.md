[solana-suite](../README.md) / [Exports](../modules.md) / Memo

# Namespace: Memo

## Table of contents

### Functions

- [createInstruction](Memo.md#createinstruction)
- [decode](Memo.md#decode)
- [encode](Memo.md#encode)
- [own](Memo.md#own)
- [parseInstruction](Memo.md#parseinstruction)

## Functions

### createInstruction

▸ `Const` **createInstruction**(`data`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/memo.ts:22](https://github.com/fukaoi/solana-suite/blob/262aa17/src/memo.ts#L22)

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

[src/memo.ts:18](https://github.com/fukaoi/solana-suite/blob/262aa17/src/memo.ts#L18)

___

### encode

▸ `Const` **encode**(`data`): `Buffer`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |

#### Returns

`Buffer`

#### Defined in

[src/memo.ts:20](https://github.com/fukaoi/solana-suite/blob/262aa17/src/memo.ts#L20)

___

### own

▸ `Const` **own**(`instruction`, `sourceSecret`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instruction` | `TransactionInstruction` |
| `sourceSecret` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/memo.ts:38](https://github.com/fukaoi/solana-suite/blob/262aa17/src/memo.ts#L38)

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

[src/memo.ts:30](https://github.com/fukaoi/solana-suite/blob/262aa17/src/memo.ts#L30)
