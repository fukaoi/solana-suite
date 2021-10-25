[solana-suite](../README.md) / [Exports](../modules.md) / [Result](../modules/Result.md) / Err

# Interface: Err<T, E\>

[Result](../modules/Result.md).Err

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends `Error` |

## Hierarchy

- `InternalErr`<`T`, `E`\>

  ↳ **`Err`**

## Table of contents

### Properties

- [error](Result.Err.md#error)
- [isErr](Result.Err.md#iserr)
- [isOk](Result.Err.md#isok)

### Methods

- [\_chain](Result.Err.md#_chain)
- [chain](Result.Err.md#chain)
- [map](Result.Err.md#map)
- [match](Result.Err.md#match)
- [unwrap](Result.Err.md#unwrap)

## Properties

### error

• `Readonly` **error**: `E`

#### Inherited from

InternalErr.error

___

### isErr

• `Readonly` **isErr**: ``true``

#### Inherited from

InternalErr.isErr

#### Defined in

[src/result.ts:82](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L82)

___

### isOk

• `Readonly` **isOk**: ``false``

#### Inherited from

InternalErr.isOk

#### Defined in

[src/result.ts:81](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L81)

## Methods

### \_chain

▸ `Protected` **_chain**<`X`, `U`\>(`_ok`, `err`): [`Result`](../modules.md#result)<`X`, `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `X` | `X` |
| `U` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_ok` | (`value`: `T`) => [`Result`](../modules.md#result)<`X`, `U`\> |
| `err` | (`error`: `E`) => [`Result`](../modules.md#result)<`X`, `U`\> |

#### Returns

[`Result`](../modules.md#result)<`X`, `U`\>

#### Inherited from

InternalErr.\_chain

#### Defined in

[src/result.ts:87](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L87)

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

InternalErr.chain

#### Defined in

[src/result.ts:39](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L39)

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

InternalErr.chain

#### Defined in

[src/result.ts:40](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L40)

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

InternalErr.chain

#### Defined in

[src/result.ts:45](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L45)

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

InternalErr.map

#### Defined in

[src/result.ts:26](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L26)

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

InternalErr.map

#### Defined in

[src/result.ts:27](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L27)

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

InternalErr.match

#### Defined in

[src/result.ts:57](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L57)

___

### unwrap

▸ **unwrap**(): `T`

#### Returns

`T`

#### Inherited from

InternalErr.unwrap

#### Defined in

[src/result.ts:9](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L9)

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

InternalErr.unwrap

#### Defined in

[src/result.ts:10](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L10)

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

InternalErr.unwrap

#### Defined in

[src/result.ts:11](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/result.ts#L11)
