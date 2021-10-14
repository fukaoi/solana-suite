[solana-suite](../README.md) / [Exports](../modules.md) / Metaplex

# Namespace: Metaplex

## Table of contents

### Interfaces

- [Creators](../interfaces/Metaplex.Creators.md)
- [Format](../interfaces/Metaplex.Format.md)

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

[src/nft/metaplex/index.ts:89](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/index.ts#L89)

___

### initFormat

▸ `Const` **initFormat**(): [`Format`](../interfaces/Metaplex.Format.md)

#### Returns

[`Format`](../interfaces/Metaplex.Format.md)

#### Defined in

[src/nft/metaplex/index.ts:77](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/index.ts#L77)

___

### mint

▸ `Const` **mint**(`data`, `owner`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `owner` | `Keypair` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/nft/metaplex/index.ts:111](https://github.com/fukaoi/solana-suite/blob/25d3582/src/nft/metaplex/index.ts#L111)
