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

[src/nft/metaplex/index.ts:92](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/nft/metaplex/index.ts#L92)

___

### initFormat

▸ `Const` **initFormat**(): [`Format`](../interfaces/Metaplex.Format.md)

#### Returns

[`Format`](../interfaces/Metaplex.Format.md)

#### Defined in

[src/nft/metaplex/index.ts:80](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/nft/metaplex/index.ts#L80)

___

### mint

▸ `Const` **mint**(`data`, `owner`): `Promise`<[`Result`](../modules.md#result)<[`MintResult`](../interfaces/Metaplex.MintResult.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `owner` | `Keypair` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`MintResult`](../interfaces/Metaplex.MintResult.md), `Error`\>\>

#### Defined in

[src/nft/metaplex/index.ts:114](https://github.com/fukaoi/solana-suite/blob/ae9dd8e/src/nft/metaplex/index.ts#L114)
