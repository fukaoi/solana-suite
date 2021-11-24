[solana-suite](../README.md) / [Exports](../modules.md) / MetaplexInstruction

# Namespace: MetaplexInstruction

## Table of contents

### Functions

- [mint](MetaplexInstruction.md#mint)
- [mintAccount](MetaplexInstruction.md#mintaccount)

## Functions

### mint

▸ `Const` **mint**(`instructions`, `createdAccount`, `owner`, `freezeAuthority`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instructions` | `TransactionInstruction`[] |
| `createdAccount` | `PublicKey` |
| `owner` | `PublicKey` |
| `freezeAuthority` | `PublicKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/nft/metaplex/index.ts:58](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/nft/metaplex/index.ts#L58)

___

### mintAccount

▸ `Const` **mintAccount**(`instructions`, `owner`, `signers`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `instructions` | `TransactionInstruction`[] |
| `owner` | `PublicKey` |
| `signers` | `Signer`[] |

#### Returns

`Promise`<`Object`\>

#### Defined in

[src/nft/metaplex/index.ts:30](https://github.com/fukaoi/solana-suite/blob/368a1a5/src/nft/metaplex/index.ts#L30)
