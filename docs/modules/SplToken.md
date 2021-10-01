[solana-suite](../README.md) / [Exports](../modules.md) / SplToken

# Namespace: SplToken

## Table of contents

### Functions

- [create](SplToken.md#create)
- [getTransferDestinationList](SplToken.md#gettransferdestinationlist)
- [getTransferHistory](SplToken.md#gettransferhistory)
- [transfer](SplToken.md#transfer)

## Functions

### create

▸ `Const` **create**(`sourceSecret`, `totalAmount`, `decimal`, `authority?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceSecret` | `string` |
| `totalAmount` | `number` |
| `decimal` | `number` |
| `authority` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/spl-token.ts:94](https://github.com/fukaoi/solana-suite/blob/262aa17/src/spl-token.ts#L94)

___

### getTransferDestinationList

▸ `Const` **getTransferDestinationList**(`pubkeyStr`): `Promise`<`TransferDestinationList`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkeyStr` | `string` |

#### Returns

`Promise`<`TransferDestinationList`[]\>

#### Defined in

[src/spl-token.ts:73](https://github.com/fukaoi/solana-suite/blob/262aa17/src/spl-token.ts#L73)

___

### getTransferHistory

▸ `Const` **getTransferHistory**(`pubkeyStr`): `Promise`<`TransferHistory`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pubkeyStr` | `string` |

#### Returns

`Promise`<`TransferHistory`[]\>

#### Defined in

[src/spl-token.ts:57](https://github.com/fukaoi/solana-suite/blob/262aa17/src/spl-token.ts#L57)

___

### transfer

▸ `Const` **transfer**(`tokenId`, `sourceSecret`, `destination`, `amount`, `instruction?`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |
| `sourceSecret` | `string` |
| `destination` | `string` |
| `amount` | `number` |
| `instruction?` | `TransactionInstruction` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/spl-token.ts:125](https://github.com/fukaoi/solana-suite/blob/262aa17/src/spl-token.ts#L125)
