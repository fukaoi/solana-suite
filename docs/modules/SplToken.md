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

[src/spl-token.ts:102](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L102)

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

[src/spl-token.ts:78](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L78)

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

[src/spl-token.ts:130](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L130)

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

[src/spl-token.ts:60](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L60)

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

[src/spl-token.ts:185](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L185)

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

[src/spl-token.ts:73](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/spl-token.ts#L73)
