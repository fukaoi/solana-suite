[solana-suite](../README.md) / [Exports](../modules.md) / Result

# Namespace: Result

## Table of contents

### Interfaces

- [Err](../interfaces/Result.Err.md)
- [Ok](../interfaces/Result.Ok.md)

### Functions

- [all](Result.md#all)
- [err](Result.md#err)
- [ok](Result.md#ok)

## Functions

### all

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`, `R14`, `R15`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>, `OkType`<`R14`\>, `OkType`<`R15`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13` \| `R14` \| `R15`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |
| `R11` | extends `U` |
| `R12` | extends `U` |
| `R13` | extends `U` |
| `R14` | extends `U` |
| `R15` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`, `R14`, `R15`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>, `OkType`<`R14`\>, `OkType`<`R15`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13` \| `R14` \| `R15`\>\>

#### Defined in

[src/result.ts:129](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L129)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`, `R14`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>, `OkType`<`R14`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13` \| `R14`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |
| `R11` | extends `U` |
| `R12` | extends `U` |
| `R13` | extends `U` |
| `R14` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`, `R14`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>, `OkType`<`R14`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13` \| `R14`\>\>

#### Defined in

[src/result.ts:186](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L186)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |
| `R11` | extends `U` |
| `R12` | extends `U` |
| `R13` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`, `R13`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>, `OkType`<`R12`\>, `OkType`<`R13`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11` \| `R12` \| `R13`\>\>

#### Defined in

[src/result.ts:240](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L240)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |
| `R11` | extends `U` |
| `R12` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`, `R12`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11`\>\>

#### Defined in

[src/result.ts:278](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L278)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |
| `R11` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`, `R11`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>, `OkType`<`R11`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10` \| `R11`\>\>

#### Defined in

[src/result.ts:311](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L311)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |
| `R10` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`, `R10`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>, `OkType`<`R10`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9` \| `R10`\>\>

#### Defined in

[src/result.ts:343](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L343)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |
| `R9` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`, `R9`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>, `OkType`<`R9`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8` \| `R9`\>\>

#### Defined in

[src/result.ts:373](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L373)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |
| `R8` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`, `R8`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>, `OkType`<`R8`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7` \| `R8`\>\>

#### Defined in

[src/result.ts:401](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L401)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |
| `R7` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`, `R7`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>, `OkType`<`R7`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6` \| `R7`\>\>

#### Defined in

[src/result.ts:427](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L427)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |
| `R6` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`, `R6`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>, `OkType`<`R6`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5` \| `R6`\>\>

#### Defined in

[src/result.ts:451](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L451)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`, `R5`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |
| `R5` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`, `R5`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>, `OkType`<`R5`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4` \| `R5`\>\>

#### Defined in

[src/result.ts:473](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L473)

▸ **all**<`R0`, `R1`, `R2`, `R3`, `R4`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |
| `R4` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`, `R4`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>, `OkType`<`R4`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3` \| `R4`\>\>

#### Defined in

[src/result.ts:486](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L486)

▸ **all**<`R0`, `R1`, `R2`, `R3`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |
| `R3` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`, `R3`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>, `OkType`<`R3`\>], `ErrType`<`R0` \| `R1` \| `R2` \| `R3`\>\>

#### Defined in

[src/result.ts:498](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L498)

▸ **all**<`R0`, `R1`, `R2`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>], `ErrType`<`R0` \| `R1` \| `R2`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |
| `R2` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`, `R2`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>, `OkType`<`R2`\>], `ErrType`<`R0` \| `R1` \| `R2`\>\>

#### Defined in

[src/result.ts:504](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L504)

▸ **all**<`R0`, `R1`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>], `ErrType`<`R0` \| `R1`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |
| `R1` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`, `R1`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>, `OkType`<`R1`\>], `ErrType`<`R0` \| `R1`\>\>

#### Defined in

[src/result.ts:507](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L507)

▸ **all**<`R0`\>(`obj`): [`Result`](../modules.md#result)<[`OkType`<`R0`\>], `ErrType`<`R0`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R0` | extends `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [`R0`] |

#### Returns

[`Result`](../modules.md#result)<[`OkType`<`R0`\>], `ErrType`<`R0`\>\>

#### Defined in

[src/result.ts:510](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L510)

▸ **all**(`obj`): [`Result`](../modules.md#result)<[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | [] |

#### Returns

[`Result`](../modules.md#result)<[]\>

#### Defined in

[src/result.ts:513](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L513)

▸ **all**<`T`\>(`obj`): [`Result`](../modules.md#result)<{ [K in keyof T]: T[K] extends Result<infer I\> ? I : never }, { [K in keyof T]: T[K] extends Result<unknown, infer E\> ? E : never }[keyof `T`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `U`[] \| `Record`<`string`, `U`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `T` |

#### Returns

[`Result`](../modules.md#result)<{ [K in keyof T]: T[K] extends Result<infer I\> ? I : never }, { [K in keyof T]: T[K] extends Result<unknown, infer E\> ? E : never }[keyof `T`]\>

#### Defined in

[src/result.ts:514](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L514)

___

### err

▸ **err**<`E`, `T`\>(`error?`): [`Result`](../modules.md#result)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Error` |
| `T` | `never` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `error?` | `E` |

#### Returns

[`Result`](../modules.md#result)<`T`, `E`\>

#### Defined in

[src/result.ts:123](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L123)

___

### ok

▸ **ok**<`T`, `E`\>(`value`): [`Result`](../modules.md#result)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends `Error` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`Result`](../modules.md#result)<`T`, `E`\>

#### Defined in

[src/result.ts:120](https://github.com/fukaoi/solana-suite/blob/c40ba3d/src/result.ts#L120)
