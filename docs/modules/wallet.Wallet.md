[solana-suite](../README.md) / [Exports](../modules.md) / [wallet](wallet.md) / Wallet

# Namespace: Wallet

[wallet](wallet.md).Wallet

## Table of contents

### Interfaces

- [Keypair](../interfaces/wallet.Wallet.Keypair.md)

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](wallet.Wallet.md#default_airdrop_amount)

### Functions

- [create](wallet.Wallet.md#create)
- [findAssocaiatedTokenAddress](wallet.Wallet.md#findassocaiatedtokenaddress)
- [getBalance](wallet.Wallet.md#getbalance)

## Variables

### DEFAULT\_AIRDROP\_AMOUNT

• `Const` **DEFAULT\_AIRDROP\_AMOUNT**: `number`

#### Defined in

[wallet.ts:23](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/wallet.ts#L23)

## Functions

### create

▸ `Const` **create**(): `Promise`<[`Keypair`](../interfaces/wallet.Wallet.Keypair.md)\>

#### Returns

`Promise`<[`Keypair`](../interfaces/wallet.Wallet.Keypair.md)\>

#### Defined in

[wallet.ts:34](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/wallet.ts#L34)

___

### findAssocaiatedTokenAddress

▸ `Const` **findAssocaiatedTokenAddress**(`sourcePubkey`, `tokenId`): `Promise`<`PublicKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourcePubkey` | `string` |
| `tokenId` | `string` |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[wallet.ts:46](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/wallet.ts#L46)

___

### getBalance

▸ `Const` **getBalance**(`pubkey`, `unit?`): `Promise`<`number`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pubkey` | `string` | `undefined` |
| `unit` | `Unit` | `'sol'` |

#### Returns

`Promise`<`number`\>

#### Defined in

[wallet.ts:25](https://github.com/fukaoi/solana-suite/blob/957ccbb/src/wallet.ts#L25)
