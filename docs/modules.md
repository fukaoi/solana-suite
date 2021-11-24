[solana-suite](README.md) / Exports

# solana-suite

## Table of contents

### Namespaces

- [Account](modules/Account.md)
- [Constants](modules/Constants.md)
- [ConstantsFunc](modules/ConstantsFunc.md)
- [Memo](modules/Memo.md)
- [Metaplex](modules/Metaplex.md)
- [MetaplexInstruction](modules/MetaplexInstruction.md)
- [MetaplexInstructure](modules/MetaplexInstructure.md)
- [MetaplexMetaData](modules/MetaplexMetaData.md)
- [MetaplexSerialize](modules/MetaplexSerialize.md)
- [Multisig](modules/Multisig.md)
- [Node](modules/Node.md)
- [Result](modules/Result.md)
- [SolNative](modules/SolNative.md)
- [SplToken](modules/SplToken.md)
- [Storage](modules/Storage.md)
- [StorageArweave](modules/StorageArweave.md)
- [StorageNftStorage](modules/StorageNftStorage.md)
- [Transaction](modules/Transaction.md)

### Classes

- [Instruction](classes/Instruction.md)
- [Instructions](classes/Instructions.md)
- [KeypairStr](classes/KeypairStr.md)

### Type aliases

- [Pubkey](modules.md#pubkey)
- [Result](modules.md#result)
- [Secret](modules.md#secret)

### Properties

- [default](modules.md#default)

### Functions

- [tryCatch](modules.md#trycatch)

## Type aliases

### Pubkey

Ƭ **Pubkey**: `string`

#### Defined in

[src/account.ts:12](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/account.ts#L12)

___

### Result

Ƭ **Result**<`T`, `E`\>: [`Ok`](interfaces/Result.Ok.md)<`T`, `E`\> \| [`Err`](interfaces/Result.Err.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends `Error` = `Error` |

#### Defined in

[src/result.ts:551](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/result.ts#L551)

___

### Secret

Ƭ **Secret**: `string`

#### Defined in

[src/account.ts:13](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/account.ts#L13)

## Properties

### default

• **default**: `any`

#### Defined in

node_modules/@types/node/globals.d.ts:589

## Functions

### tryCatch

▸ `Const` **tryCatch**(`fn`): [`Ok`](interfaces/Result.Ok.md)<`Object`, `Error`\> \| [`Err`](interfaces/Result.Err.md)<`Object`, `Error`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | () => {} |

#### Returns

[`Ok`](interfaces/Result.Ok.md)<`Object`, `Error`\> \| [`Err`](interfaces/Result.Err.md)<`Object`, `Error`\>

#### Defined in

[src/global.ts:85](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/global.ts#L85)
