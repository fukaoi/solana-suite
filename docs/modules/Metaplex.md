[solana-suite](../README.md) / [Exports](../modules.md) / Metaplex

# Namespace: Metaplex

## Table of contents

### Interfaces

- [Creators](../interfaces/Metaplex.Creators.md)
- [Format](../interfaces/Metaplex.Format.md)
- [MintResult](../interfaces/Metaplex.MintResult.md)

### Functions

- [create](Metaplex.md#create)
- [initFormat](Metaplex.md#initformat)
- [mint](Metaplex.md#mint)

## Functions

### create

▸ `Const` **create**(`payer`, `signers`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payer` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`fn`

▸ (`instructions?`): `Promise`<`Object`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `instructions?` | `TransactionInstruction`[] |

##### Returns

`Promise`<`Object`\>

#### Defined in

[src/nft/metaplex/index.ts:96](https://github.com/fukaoi/solana-suite/blob/077409e/src/nft/metaplex/index.ts#L96)

___

### initFormat

▸ `Const` **initFormat**(): [`Format`](../interfaces/Metaplex.Format.md)

#### Returns

[`Format`](../interfaces/Metaplex.Format.md)

#### Defined in

[src/nft/metaplex/index.ts:84](https://github.com/fukaoi/solana-suite/blob/077409e/src/nft/metaplex/index.ts#L84)

___

### mint

▸ `Const` **mint**(`data`, `owner`, `signers`): (`append?`: [`Value`](../interfaces/Append.Value.md)) => `Promise`<[`Result`](../modules.md#result)<[`MintResult`](../interfaces/Metaplex.MintResult.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `owner` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`fn`

▸ (`append?`): `Promise`<[`Result`](../modules.md#result)<[`MintResult`](../interfaces/Metaplex.MintResult.md), `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `append?` | [`Value`](../interfaces/Append.Value.md) |

##### Returns

`Promise`<[`Result`](../modules.md#result)<[`MintResult`](../interfaces/Metaplex.MintResult.md), `Error`\>\>

#### Defined in

[src/nft/metaplex/index.ts:118](https://github.com/fukaoi/solana-suite/blob/077409e/src/nft/metaplex/index.ts#L118)
