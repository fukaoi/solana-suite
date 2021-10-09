[solana-suite](../README.md) / [Exports](../modules.md) / Wallet

# Namespace: Wallet

## Table of contents

### Interfaces

- [KeyPair](../interfaces/Wallet.KeyPair.md)

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](Wallet.md#default_airdrop_amount)

### Functions

- [create](Wallet.md#create)
- [createAssociatedTokenAccountInstruction](Wallet.md#createassociatedtokenaccountinstruction)
- [findAssocaiatedTokenAddress](Wallet.md#findassocaiatedtokenaddress)
- [findMetaplexAssocaiatedTokenAddress](Wallet.md#findmetaplexassocaiatedtokenaddress)
- [getBalance](Wallet.md#getbalance)
- [requestAirdrop](Wallet.md#requestairdrop)

## Variables

### DEFAULT\_AIRDROP\_AMOUNT

• **DEFAULT\_AIRDROP\_AMOUNT**: `number`

#### Defined in

[src/wallet.ts:26](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L26)

## Functions

### create

▸ `Const` **create**(): `Promise`<[`KeyPair`](../interfaces/Wallet.KeyPair.md)\>

#### Returns

`Promise`<[`KeyPair`](../interfaces/Wallet.KeyPair.md)\>

#### Defined in

[src/wallet.ts:43](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L43)

___

### createAssociatedTokenAccountInstruction

▸ `Const` **createAssociatedTokenAccountInstruction**(`associatedToken`, `payer`, `source`, `mintKey`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `associatedToken` | `PublicKey` |
| `payer` | `PublicKey` |
| `source` | `PublicKey` |
| `mintKey` | `PublicKey` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/wallet.ts:78](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L78)

___

### findAssocaiatedTokenAddress

▸ `Const` **findAssocaiatedTokenAddress**(`source`, `tokenKey`): `Promise`<`PublicKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[src/wallet.ts:51](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L51)

___

### findMetaplexAssocaiatedTokenAddress

▸ `Const` **findMetaplexAssocaiatedTokenAddress**(`tokenKey`): `Promise`<`PublicKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[src/wallet.ts:65](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L65)

___

### getBalance

▸ `Const` **getBalance**(`pubkey`, `unit?`): `Promise`<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pubkey` | `PublicKey` | `undefined` |
| `unit` | `Unit` | `'sol'` |

#### Returns

`Promise`<`number`\>

#### Defined in

[src/wallet.ts:28](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L28)

___

### requestAirdrop

▸ `Const` **requestAirdrop**(`pubkey`, `airdropAmount?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `airdropAmount` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/wallet.ts:37](https://github.com/fukaoi/solana-suite/blob/de2b092/src/wallet.ts#L37)
