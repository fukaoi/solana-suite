[solana-suite](../README.md) / [Exports](../modules.md) / Metaplex

# Namespace: Metaplex

## Table of contents

### Interfaces

- [Creators](../interfaces/Metaplex.Creators.md)
- [MetadataFormat](../interfaces/Metaplex.MetadataFormat.md)

### Functions

- [create](Metaplex.md#create)
- [mint](Metaplex.md#mint)

## Functions

### create

▸ `Const` **create**(`payer`, `signerSecrets`): (`instructions?`: `TransactionInstruction`[]) => `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `payer` | `string` |
| `signerSecrets` | `string`[] |

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

[src/nft/metaplex/index.ts:78](https://github.com/fukaoi/solana-suite/blob/262aa17/src/nft/metaplex/index.ts#L78)

___

### mint

▸ `Const` **mint**(`data`, `owner`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Data` |
| `owner` | `Object` |
| `owner.pubkey` | `string` |
| `owner.secret` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/nft/metaplex/index.ts:102](https://github.com/fukaoi/solana-suite/blob/262aa17/src/nft/metaplex/index.ts#L102)
