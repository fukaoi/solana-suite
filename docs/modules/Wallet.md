[solana-suite](../README.md) / [Exports](../modules.md) / Wallet

# Namespace: Wallet

## Table of contents

### Interfaces

- [Keypair](../interfaces/Wallet.Keypair.md)

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](Wallet.md#default_airdrop_amount)

### Functions

- [create](Wallet.md#create)
- [createAssociatedTokenAccountInstruction](Wallet.md#createassociatedtokenaccountinstruction)
- [findAssocaiatedTokenAddress](Wallet.md#findassocaiatedtokenaddress)
- [findMetaplexAssocaiatedTokenAddress](Wallet.md#findmetaplexassocaiatedtokenaddress)
- [getBalance](Wallet.md#getbalance)

## Variables

### DEFAULT\_AIRDROP\_AMOUNT

• **DEFAULT\_AIRDROP\_AMOUNT**: `number`

#### Defined in

[src/wallet.ts:28](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L28)

## Functions

### create

▸ `Const` **create**(): `Promise`<[`Keypair`](../interfaces/Wallet.Keypair.md)\>

#### Returns

`Promise`<[`Keypair`](../interfaces/Wallet.Keypair.md)\>

#### Defined in

[src/wallet.ts:39](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L39)

___

### createAssociatedTokenAccountInstruction

▸ `Const` **createAssociatedTokenAccountInstruction**(`associatedTokenAddress`, `payer`, `sourcePubkey`, `mintKey`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `associatedTokenAddress` | `string` |
| `payer` | `string` |
| `sourcePubkey` | `string` |
| `mintKey` | `string` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/wallet.ts:82](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L82)

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

[src/wallet.ts:52](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L52)

___

### findMetaplexAssocaiatedTokenAddress

▸ `Const` **findMetaplexAssocaiatedTokenAddress**(`tokenId`): `Promise`<`PublicKey`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<`PublicKey`\>

#### Defined in

[src/wallet.ts:68](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L68)

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

[src/wallet.ts:30](https://github.com/fukaoi/solana-suite/blob/262aa17/src/wallet.ts#L30)
