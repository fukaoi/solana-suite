[solana-suite](../README.md) / [Exports](../modules.md) / [memo](memo.md) / Memo

# Namespace: Memo

[memo](memo.md).Memo

## Table of contents

### Functions

- [createInstruction](memo.Memo.md#createinstruction)
- [decode](memo.Memo.md#decode)
- [encode](memo.Memo.md#encode)
- [own](memo.Memo.md#own)
- [parseInstruction](memo.Memo.md#parseinstruction)

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

[memo.ts:21](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/memo.ts#L21)

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

[memo.ts:17](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/memo.ts#L17)

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

[memo.ts:19](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/memo.ts#L19)

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

[memo.ts:34](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/memo.ts#L34)

___

### parseInstruction

▸ `Const` **parseInstruction**(`tx`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `TransactionResponse` |

#### Returns

`any`

#### Defined in

[memo.ts:29](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/memo.ts#L29)
