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
- [submit](Result.Ok.md#submit)
- [unwrap](Result.Ok.md#unwrap)

## Properties

### isErr

• `Readonly` **isErr**: ``false``

#### Inherited from

InternalOk.isErr

#### Defined in

[src/result.ts:92](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L92)

___

### isOk

• `Readonly` **isOk**: ``true``

#### Inherited from

InternalOk.isOk

#### Defined in

[src/result.ts:91](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L91)

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

[src/result.ts:97](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L97)

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

[src/result.ts:42](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L42)

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

[src/result.ts:43](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L43)

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

[src/result.ts:48](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L48)

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

[src/result.ts:29](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L29)

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

[src/result.ts:30](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L30)

___

### match

▸ **match**<`U`, `F`\>(`ok`, `err`): `void` \| `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `U` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ok` | (`value`: `T`) => `U` |
| `err` | (`error`: `E`) => `F` |

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

InternalOk.match

#### Defined in

[src/result.ts:60](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L60)

___

### submit

▸ **submit**(): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Inherited from

InternalOk.submit

#### Defined in

[src/result.ts:77](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L77)

___

### unwrap

▸ **unwrap**(): `T`

#### Returns

`T`

#### Inherited from

InternalOk.unwrap

#### Defined in

[src/result.ts:12](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L12)

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

[src/result.ts:13](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L13)

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

[src/result.ts:14](https://github.com/fukaoi/solana-suite/blob/4c92ab0/src/result.ts#L14)
