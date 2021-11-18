[solana-suite](../README.md) / [Exports](../modules.md) / Memo

# Namespace: Memo

## Table of contents

### Functions

- [create](Memo.md#create)
- [decode](Memo.md#decode)
- [encode](Memo.md#encode)
- [parse](Memo.md#parse)

## Functions

### create

▸ `Const` **create**(`data`, `signers`, `owners?`, `feePayer?`): [`Instruction`](../classes/Instruction.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `data` | `string` | `undefined` |
| `signers` | `Signer`[] | `undefined` |
| `owners` | `PublicKey`[] | `[]` |
| `feePayer?` | `Signer` | `undefined` |

#### Returns

[`Instruction`](../classes/Instruction.md)

#### Defined in

[src/memo.ts:18](https://github.com/fukaoi/solana-suite/blob/5f78595/src/memo.ts#L18)

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

[src/memo.ts:13](https://github.com/fukaoi/solana-suite/blob/5f78595/src/memo.ts#L13)

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

[src/memo.ts:16](https://github.com/fukaoi/solana-suite/blob/5f78595/src/memo.ts#L16)

___

### parse

▸ `Const` **parse**(`tx`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tx` | `ParsedConfirmedTransaction` |

#### Returns

`string`

#### Defined in

[src/memo.ts:51](https://github.com/fukaoi/solana-suite/blob/5f78595/src/memo.ts#L51)
