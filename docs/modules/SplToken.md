[solana-suite](../README.md) / [Exports](../modules.md) / SplToken

# Namespace: SplToken

## Table of contents

### Interfaces

- [TransferDestinationList](../interfaces/SplToken.TransferDestinationList.md)
- [TransferHistory](../interfaces/SplToken.TransferHistory.md)

### Functions

- [create](SplToken.md#create)
- [getTransferDestinationList](SplToken.md#gettransferdestinationlist)
- [getTransferHistory](SplToken.md#gettransferhistory)
- [subscribeAccount](SplToken.md#subscribeaccount)
- [transfer](SplToken.md#transfer)
- [unsubscribeAccount](SplToken.md#unsubscribeaccount)

## Functions

### create

▸ `Const` **create**(`source`, `totalAmount`, `mintDecimal`, `authority?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `source` | `Keypair` | `undefined` |
| `totalAmount` | `number` | `undefined` |
| `mintDecimal` | `number` | `undefined` |
| `authority` | `PublicKey` | `source.publicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/spl-token.ts:124](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L124)

___

### getTransferDestinationList

▸ `Const` **getTransferDestinationList**(`pubkey`): `Promise`<[`Result`](../modules.md#result)<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[], `Error`\>\>

#### Defined in

[src/spl-token.ts:98](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L98)

___

### getTransferHistory

▸ `Const` **getTransferHistory**(`pubkey`, `limit?`): `Promise`<[`Result`](../modules.md#result)<[`TransferHistory`](../interfaces/SplToken.TransferHistory.md)[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `limit?` | `number` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`TransferHistory`](../interfaces/SplToken.TransferHistory.md)[], `Error`\>\>

#### Defined in

[src/spl-token.ts:76](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L76)

___

### subscribeAccount

▸ `Const` **subscribeAccount**(`pubkey`, `callback`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `callback` | `any` |

#### Returns

`number`

#### Defined in

[src/spl-token.ts:61](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L61)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `amount`, `mintDecimal`, `instruction?`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `Keypair` |
| `dest` | `PublicKey` |
| `amount` | `number` |
| `mintDecimal` | `number` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/spl-token.ts:168](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L168)

___

### unsubscribeAccount

▸ `Const` **unsubscribeAccount**(`subscribeId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscribeId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/spl-token.ts:72](https://github.com/fukaoi/solana-suite/blob/9ac8f4b/src/spl-token.ts#L72)
