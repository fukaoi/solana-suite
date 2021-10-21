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

▸ `Const` **create**(`source`, `totalAmount`, `mintDecimal`, `authority?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `Keypair` |
| `totalAmount` | `number` |
| `mintDecimal` | `number` |
| `authority` | `PublicKey` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/spl-token.ts:112](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L112)

___

### getTransferDestinationList

▸ `Const` **getTransferDestinationList**(`pubkey`): `Promise`<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |

#### Returns

`Promise`<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[]\>

#### Defined in

[src/spl-token.ts:91](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L91)

___

### getTransferHistory

▸ `Const` **getTransferHistory**(`pubkey`, `limit?`): `Promise`<[`TransferHistory`](../interfaces/SplToken.TransferHistory.md)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |
| `limit?` | `number` |

#### Returns

`Promise`<[`TransferHistory`](../interfaces/SplToken.TransferHistory.md)[]\>

#### Defined in

[src/spl-token.ts:75](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L75)

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

[src/spl-token.ts:61](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L61)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `amount`, `mintDecimal`, `instruction?`): `Promise`<`string`\>

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

`Promise`<`string`\>

#### Defined in

[src/spl-token.ts:141](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L141)

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

[src/spl-token.ts:71](https://github.com/fukaoi/solana-suite/blob/127fc4a/src/spl-token.ts#L71)
