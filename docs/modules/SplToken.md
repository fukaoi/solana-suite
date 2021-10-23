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

▸ `Const` **create**(`source`, `feePayer`, `totalAmount`, `mintDecimal`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `PublicKey` |
| `feePayer` | `Keypair` |
| `totalAmount` | `number` |
| `mintDecimal` | `number` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/spl-token.ts:124](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L124)

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

[src/spl-token.ts:98](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L98)

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

[src/spl-token.ts:76](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L76)

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

[src/spl-token.ts:60](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L60)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `source`, `dest`, `amount`, `mintDecimal`): (`append`: [`AppendValue`](../interfaces/Transaction.AppendValue.md)) => `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `source` | `PublicKey` |
| `dest` | `PublicKey` |
| `amount` | `number` |
| `mintDecimal` | `number` |

#### Returns

`fn`

▸ (`append`): `Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `append` | [`AppendValue`](../interfaces/Transaction.AppendValue.md) |

##### Returns

`Promise`<[`Result`](../modules.md#result)<`string`, `Error`\>\>

#### Defined in

[src/spl-token.ts:170](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L170)

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

[src/spl-token.ts:71](https://github.com/fukaoi/solana-suite/blob/c7cf758/src/spl-token.ts#L71)
