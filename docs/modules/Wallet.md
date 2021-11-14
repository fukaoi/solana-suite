[solana-suite](../README.md) / [Exports](../modules.md) / Wallet

# Namespace: Wallet

## Table of contents

### Interfaces

- [KeypairStr](../interfaces/Wallet.KeypairStr.md)

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](Wallet.md#default_airdrop_amount)
- [MAX\_AIRDROP\_SOL](Wallet.md#max_airdrop_sol)

### Functions

- [create](Wallet.md#create)
- [findAssocaiatedTokenAddress](Wallet.md#findassocaiatedtokenaddress)
- [findMetaplexAssocaiatedTokenAddress](Wallet.md#findmetaplexassocaiatedtokenaddress)
- [getBalance](Wallet.md#getbalance)
- [requestAirdrop](Wallet.md#requestairdrop)

## Variables

### DEFAULT\_AIRDROP\_AMOUNT

• **DEFAULT\_AIRDROP\_AMOUNT**: `number`

#### Defined in

[src/wallet.ts:22](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L22)

___

### MAX\_AIRDROP\_SOL

• **MAX\_AIRDROP\_SOL**: `number`

#### Defined in

[src/wallet.ts:23](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L23)

## Functions

### create

▸ `Const` **create**(): [`KeypairStr`](../interfaces/Wallet.KeypairStr.md)

#### Returns

[`KeypairStr`](../interfaces/Wallet.KeypairStr.md)

#### Defined in

[src/wallet.ts:60](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L60)

___

### findAssocaiatedTokenAddress

▸ `Const` **findAssocaiatedTokenAddress**(`owner`, `tokenKey`): `Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `PublicKey` |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Defined in

[src/wallet.ts:68](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L68)

___

### findMetaplexAssocaiatedTokenAddress

▸ `Const` **findMetaplexAssocaiatedTokenAddress**(`tokenKey`): `Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Defined in

[src/wallet.ts:84](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L84)

___

### getBalance

▸ `Const` **getBalance**(`pubkey`, `unit?`): `Promise`<[`Result`](../modules.md#result)<`number`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pubkey` | `PublicKey` | `undefined` |
| `unit` | `Unit` | `'sol'` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`number`, `Error`\>\>

#### Defined in

[src/wallet.ts:25](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L25)

___

### requestAirdrop

▸ `Const` **requestAirdrop**(`pubkey`, `airdropAmount?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `pubkey` | `PublicKey` | `undefined` |
| `airdropAmount` | `number` | `DEFAULT_AIRDROP_AMOUNT` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/wallet.ts:42](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/wallet.ts#L42)
