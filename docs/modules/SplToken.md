[solana-suite](../README.md) / [Exports](../modules.md) / SplToken

# Namespace: SplToken

## Table of contents

### Interfaces

- [TransferDestinationList](../interfaces/SplToken.TransferDestinationList.md)
- [TransferHistory](../interfaces/SplToken.TransferHistory.md)

### Functions

- [getTransferDestinationList](SplToken.md#gettransferdestinationlist)
- [getTransferHistory](SplToken.md#gettransferhistory)
- [mint](SplToken.md#mint)
- [subscribeAccount](SplToken.md#subscribeaccount)
- [transfer](SplToken.md#transfer)
- [transferNft](SplToken.md#transfernft)
- [unsubscribeAccount](SplToken.md#unsubscribeaccount)

## Functions

### getTransferDestinationList

▸ `Const` **getTransferDestinationList**(`pubkey`): `Promise`<[`Result`](../modules.md#result)<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[], `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkey` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`TransferDestinationList`](../interfaces/SplToken.TransferDestinationList.md)[], `Error`\>\>

#### Defined in

[src/spl-token.ts:106](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L106)

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

[src/spl-token.ts:82](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L82)

___

### mint

▸ `Const` **mint**(`owner`, `signers`, `totalAmount`, `mintDecimal`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `owner` | `PublicKey` |
| `signers` | `Signer`[] |
| `totalAmount` | `number` |
| `mintDecimal` | `number` |
| `feePayer?` | `Signer` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/spl-token.ts:134](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L134)

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

[src/spl-token.ts:64](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L64)

___

### transfer

▸ `Const` **transfer**(`tokenKey`, `owner`, `dest`, `signers`, `amount`, `mintDecimal`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `owner` | `PublicKey` |
| `dest` | `PublicKey` |
| `signers` | `Signer`[] |
| `amount` | `number` |
| `mintDecimal` | `number` |
| `feePayer?` | `Signer` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/spl-token.ts:189](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L189)

___

### transferNft

▸ `Const` **transferNft**(`tokenKey`, `owner`, `dest`, `signers`, `feePayer?`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenKey` | `PublicKey` |
| `owner` | `PublicKey` |
| `dest` | `PublicKey` |
| `signers` | `Signer`[] |
| `feePayer?` | `Signer` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/spl-token.ts:243](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L243)

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

[src/spl-token.ts:77](https://github.com/fukaoi/solana-suite/blob/bbfcf40/src/spl-token.ts#L77)
