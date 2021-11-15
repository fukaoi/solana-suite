[solana-suite](../README.md) / [Exports](../modules.md) / Account

# Namespace: Account

## Table of contents

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](Account.md#default_airdrop_amount)
- [MAX\_AIRDROP\_SOL](Account.md#max_airdrop_sol)

### Functions

- [create](Account.md#create)
- [findAssocaiatedTokenAddress](Account.md#findassocaiatedtokenaddress)
- [findMetaplexAssocaiatedTokenAddress](Account.md#findmetaplexassocaiatedtokenaddress)
- [getBalance](Account.md#getbalance)
- [requestAirdrop](Account.md#requestairdrop)

## Variables

### DEFAULT\_AIRDROP\_AMOUNT

• **DEFAULT\_AIRDROP\_AMOUNT**: `number`

#### Defined in

[src/account.ts:43](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L43)

___

### MAX\_AIRDROP\_SOL

• **MAX\_AIRDROP\_SOL**: `number`

#### Defined in

[src/account.ts:44](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L44)

## Functions

### create

▸ `Const` **create**(): [`KeypairStr`](../classes/KeypairStr.md)

#### Returns

[`KeypairStr`](../classes/KeypairStr.md)

#### Defined in

[src/account.ts:88](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L88)

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

[src/account.ts:96](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L96)

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

[src/account.ts:112](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L112)

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

[src/account.ts:46](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L46)

___

### requestAirdrop

▸ `Const` **requestAirdrop**(`pubkey`, `airdropAmount?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `airdropAmount?` | `number` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/account.ts:65](https://github.com/fukaoi/solana-suite/blob/f1947cd/src/account.ts#L65)
