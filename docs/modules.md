[solana-suite](README.md) / Exports

# solana-suite

## Table of contents

### Namespaces

- [Constants](modules/Constants.md)
- [ConstantsFunc](modules/ConstantsFunc.md)
- [Memo](modules/Memo.md)
- [Metaplex](modules/Metaplex.md)
- [MetaplexInstructure](modules/MetaplexInstructure.md)
- [MetaplexMetaData](modules/MetaplexMetaData.md)
- [MetaplexSerialize](modules/MetaplexSerialize.md)
- [Node](modules/Node.md)
- [Result](modules/Result.md)
- [SolNative](modules/SolNative.md)
- [SplNft](modules/SplNft.md)
- [SplToken](modules/SplToken.md)
- [Storage](modules/Storage.md)
- [StorageArweave](modules/StorageArweave.md)
- [StorageNftStorage](modules/StorageNftStorage.md)
- [Transaction](modules/Transaction.md)
- [Util](modules/Util.md)
- [Wallet](modules/Wallet.md)

### Type aliases

- [Result](modules.md#result)

### Properties

- [default](modules.md#default)

### Functions

- [tryCatch](modules.md#trycatch)

## Type aliases

### Result

Ƭ **Result**<`T`, `E`\>: [`Ok`](interfaces/Result.Ok.md)<`T`, `E`\> \| [`Err`](interfaces/Result.Err.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `E` | extends `Error``Error` |

#### Defined in

[src/result.ts:526](https://github.com/fukaoi/solana-suite/blob/42af222/src/result.ts#L526)

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

[src/global.ts:39](https://github.com/fukaoi/solana-suite/blob/42af222/src/global.ts#L39)
