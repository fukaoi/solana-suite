[solana-suite](../README.md) / [Exports](../modules.md) / Util

# Namespace: Util

## Table of contents

### Functions

- [createKeypair](Util.md#createkeypair)
- [createSigners](Util.md#createsigners)
- [dateFormat](Util.md#dateformat)
- [getApiUrl](Util.md#getapiurl)
- [getConnection](Util.md#getconnection)
- [isEmpty](Util.md#isempty)
- [sleep](Util.md#sleep)

## Functions

### createKeypair

▸ `Const` **createKeypair**(`secret`): `Keypair`

#### Parameters

| Name | Type |
| :------ | :------ |
| `secret` | `string` |

#### Returns

`Keypair`

#### Defined in

[src/util.ts:37](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L37)

___

### createSigners

▸ `Const` **createSigners**(`signerSecrets`): `Keypair`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `signerSecrets` | `string`[] |

#### Returns

`Keypair`[]

#### Defined in

[src/util.ts:42](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L42)

___

### dateFormat

▸ `Const` **dateFormat**(): `string`

#### Returns

`string`

#### Defined in

[src/util.ts:44](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L44)

___

### getApiUrl

▸ `Const` **getApiUrl**(): ``"https://api.solana.com"`` \| ``"https://api.testnet.solana.com"`` \| ``"http://api.devnet.solana.com"``

#### Returns

``"https://api.solana.com"`` \| ``"https://api.testnet.solana.com"`` \| ``"http://api.devnet.solana.com"``

#### Defined in

[src/util.ts:35](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L35)

___

### getConnection

▸ `Const` **getConnection**(): `Connection`

#### Returns

`Connection`

#### Defined in

[src/util.ts:29](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L29)

___

### isEmpty

▸ `Const` **isEmpty**(`val`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `val` | `any` |

#### Returns

`boolean`

#### Defined in

[src/util.ts:18](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L18)

___

### sleep

▸ `Const` **sleep**(`sec`): `Promise`<`unknown`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sec` | `number` |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[src/util.ts:27](https://github.com/fukaoi/solana-suite/blob/262aa17/src/util.ts#L27)
