[solana-suite](../README.md) / [Exports](../modules.md) / Wallet

# Namespace: Wallet

## Table of contents

### Interfaces

- [KeyPair](../interfaces/Wallet.KeyPair.md)

### Variables

- [DEFAULT\_AIRDROP\_AMOUNT](Wallet.md#default_airdrop_amount)
- [MAX\_AIRDROP\_SOL](Wallet.md#max_airdrop_sol)

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

[src/wallet.ts:24](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L24)

___

### MAX\_AIRDROP\_SOL

• **MAX\_AIRDROP\_SOL**: `number`

#### Defined in

[src/wallet.ts:25](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L25)

## Functions

### create

▸ `Const` **create**(): `Promise`<[`KeyPair`](../interfaces/Wallet.KeyPair.md)\>

#### Returns

`Promise`<[`KeyPair`](../interfaces/Wallet.KeyPair.md)\>

#### Defined in

[src/wallet.ts:63](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L63)

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

[src/wallet.ts:104](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L104)

___

### findAssocaiatedTokenAddress

▸ `Const` **findAssocaiatedTokenAddress**(`source`, `tokenKey`): `Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `tokenKey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`PublicKey`, `Error`\>\>

#### Defined in

[src/wallet.ts:71](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L71)

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

[src/wallet.ts:88](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L88)

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

[src/wallet.ts:27](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L27)

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

[src/wallet.ts:44](https://github.com/fukaoi/solana-suite/blob/ed5a1bc/src/wallet.ts#L44)
