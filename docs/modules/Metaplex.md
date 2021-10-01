[solana-suite](../README.md) / [Exports](../modules.md) / Metaplex

# Namespace: Metaplex

## Table of contents

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

[src/nft/metaplex/index.ts:64](https://github.com/fukaoi/solana-suite/blob/500107f/src/nft/metaplex/index.ts#L64)

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

[src/nft/metaplex/index.ts:88](https://github.com/fukaoi/solana-suite/blob/500107f/src/nft/metaplex/index.ts#L88)
