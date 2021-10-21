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
| `data` | `string` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/memo.ts:17](https://github.com/fukaoi/solana-suite/blob/1200997/src/memo.ts#L17)

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

[src/memo.ts:12](https://github.com/fukaoi/solana-suite/blob/1200997/src/memo.ts#L12)

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

[src/memo.ts:15](https://github.com/fukaoi/solana-suite/blob/1200997/src/memo.ts#L15)

___

### own

▸ `Const` **own**(`instruction`, `source`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instruction` | `TransactionInstruction` |
| `source` | `Keypair` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/memo.ts:35](https://github.com/fukaoi/solana-suite/blob/1200997/src/memo.ts#L35)

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

[src/memo.ts:26](https://github.com/fukaoi/solana-suite/blob/1200997/src/memo.ts#L26)
