[solana-suite](../README.md) / [Exports](../modules.md) / [Result](../modules/Result.md) / Ok

# Interface: Ok<T, E\>

[Result](../modules/Result.md).Ok

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends `Error` |

## Hierarchy

- `InternalOk`<`T`, `E`\>

  ↳ **`Ok`**

## Table of contents

### Properties

- [isErr](Result.Ok.md#iserr)
- [isOk](Result.Ok.md#isok)
- [value](Result.Ok.md#value)

### Methods

- [\_chain](Result.Ok.md#_chain)
- [chain](Result.Ok.md#chain)
- [map](Result.Ok.md#map)
- [match](Result.Ok.md#match)
- [unwrap](Result.Ok.md#unwrap)

## Properties

### isErr

• `Readonly` **isErr**: ``false``

#### Inherited from

InternalOk.isErr

#### Defined in

[src/result.ts:67](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L67)

___

### isOk

• `Readonly` **isOk**: ``true``

#### Inherited from

InternalOk.isOk

#### Defined in

[src/result.ts:66](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L66)

___

### value

• `Readonly` **value**: `T`

#### Inherited from

InternalOk.value

## Methods

### \_chain

▸ `Protected` **_chain**<`X`, `U`\>(`ok`, `_err`): [`Result`](../modules.md#result)<`X`, `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `X` | `X` |
| `U` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => [`Result`](../modules.md#result)<`X`, `U`\> |
| `_err` | (`error`: `E`) => [`Result`](../modules.md#result)<`X`, `U`\> |

#### Returns

[`Result`](../modules.md#result)<`X`, `U`\>

#### Inherited from

InternalOk.\_chain

#### Defined in

[src/result.ts:72](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L72)

___

### chain

▸ **chain**<`X`\>(`ok`): [`Result`](../modules.md#result)<`X`, `E`\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => [`Result`](../modules.md#result)<`X`, `E`\> |

#### Returns

[`Result`](../modules.md#result)<`X`, `E`\>

#### Inherited from

InternalOk.chain

#### Defined in

[src/result.ts:39](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L39)

▸ **chain**<`X`\>(`ok`): [`Result`](../modules.md#result)<`X`, `E`\>

#### Type parameters

| Name |
| :------ |
| `X` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => [`Result`](../modules.md#result)<`X`, `E`\> |

#### Returns

[`Result`](../modules.md#result)<`X`, `E`\>

#### Inherited from

InternalOk.chain

#### Defined in

[src/result.ts:40](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L40)

▸ **chain**<`X`, `U`\>(`ok`, `err`): [`Result`](../modules.md#result)<`X`, `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `X` | `X` |
| `U` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => [`Result`](../modules.md#result)<`X`, `U`\> |
| `err` | (`error`: `E`) => [`Result`](../modules.md#result)<`X`, `U`\> |

#### Returns

[`Result`](../modules.md#result)<`X`, `U`\>

#### Inherited from

InternalOk.chain

#### Defined in

[src/result.ts:45](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L45)

___

### map

▸ **map**<`U`\>(`ok`): [`Result`](../modules.md#result)<`U`, `E`\>

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `U` |

#### Returns

[`Result`](../modules.md#result)<`U`, `E`\>

#### Inherited from

InternalOk.map

#### Defined in

[src/result.ts:26](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L26)

▸ **map**<`U`, `F`\>(`ok`, `err`): [`Result`](../modules.md#result)<`U`, `F`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | `U` |
| `F` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `U` |
| `err` | (`error`: `E`) => `F` |

#### Returns

[`Result`](../modules.md#result)<`U`, `F`\>

#### Inherited from

InternalOk.map

#### Defined in

[src/result.ts:27](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L27)

___

### match

▸ **match**(`ok`, `err?`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `any` |
| `err?` | (`error`: `E`) => `any` |

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

InternalOk.match

#### Defined in

[src/result.ts:57](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L57)

___

### unwrap

▸ **unwrap**(): `T`

#### Returns

`T`

#### Inherited from

InternalOk.unwrap

#### Defined in

[src/result.ts:9](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L9)

▸ **unwrap**<`U`\>(`ok`): `U`

#### Type parameters

| Name |
| :------ |
| `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `U` |

#### Returns

`U`

#### Inherited from

InternalOk.unwrap

#### Defined in

[src/result.ts:10](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L10)

▸ **unwrap**<`U`, `V`\>(`ok`, `err`): `U` \| `V`

#### Type parameters

| Name |
| :------ |
| `U` |
| `V` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `U` |
| `err` | (`error`: `E`) => `V` |

#### Returns

`U` \| `V`

#### Inherited from

InternalOk.unwrap

#### Defined in

[src/result.ts:11](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L11)
