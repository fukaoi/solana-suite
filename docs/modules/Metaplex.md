[solana-suite](../README.md) / [Exports](../modules.md) / Metaplex

# Namespace: Metaplex

## Table of contents

### Interfaces

- [Creators](../interfaces/Metaplex.Creators.md)
- [Format](../interfaces/Metaplex.Format.md)

### Functions

- [initFormat](Metaplex.md#initformat)
- [initializeMint](Metaplex.md#initializemint)
- [mint](Metaplex.md#mint)

## Functions

### initFormat

▸ `Const` **initFormat**(): [`Format`](../interfaces/Metaplex.Format.md)

#### Returns

[`Format`](../interfaces/Metaplex.Format.md)

#### Defined in

[src/nft/metaplex/index.ts:94](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/nft/metaplex/index.ts#L94)

___

### initializeMint

▸ `Const` **initializeMint**(`payer`, `signers`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payer` | `PublicKey` |
| `signers` | `Signer`[] |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/nft/metaplex/index.ts:106](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/nft/metaplex/index.ts#L106)

___

### mint

▸ `Const` **mint**(`data`, `owner`, `signers`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`Data`](../classes/MetaplexInstructure.Data.md) |
| `owner` | `PublicKey` |
| `signers` | `Signer`[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/nft/metaplex/index.ts:138](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/nft/metaplex/index.ts#L138)
