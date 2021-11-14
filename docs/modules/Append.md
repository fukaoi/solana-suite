[solana-suite](../README.md) / [Exports](../modules.md) / Append

# Namespace: Append

## Table of contents

### Interfaces

- [Value](../interfaces/Append.Value.md)

### Functions

- [extractFeePayerKeypair](Append.md#extractfeepayerkeypair)
- [extractMultiSigKeypair](Append.md#extractmultisigkeypair)
- [extractOnlySignerKeypair](Append.md#extractonlysignerkeypair)
- [isInFeePayer](Append.md#isinfeepayer)
- [isInMultisig](Append.md#isinmultisig)

## Functions

### extractFeePayerKeypair

▸ `Const` **extractFeePayerKeypair**(`signers`, `feePayer`): `Keypair`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | `Keypair`[] |
| `feePayer` | `PublicKey` |

#### Returns

`Keypair`[]

#### Defined in

[src/append.ts:61](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/append.ts#L61)

___

### extractMultiSigKeypair

▸ `Const` **extractMultiSigKeypair**(`signers`, `multisig`): `Promise`<[`Result`](../modules.md#result)<`Keypair`[] \| `Error`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | `Keypair`[] |
| `multisig` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`Keypair`[] \| `Error`, `Error`\>\>

#### Defined in

[src/append.ts:64](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/append.ts#L64)

___

### extractOnlySignerKeypair

▸ `Const` **extractOnlySignerKeypair**(`signers`, `feePayer?`, `multisig?`): `Promise`<[`Result`](../modules.md#result)<`Keypair`[] \| `Error`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `signers` | `Keypair`[] |
| `feePayer?` | `PublicKey` |
| `multisig?` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`Keypair`[] \| `Error`, `Error`\>\>

#### Defined in

[src/append.ts:38](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/append.ts#L38)

___

### isInFeePayer

▸ `Const` **isInFeePayer**(`feePayer`, `signers`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `feePayer` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`boolean`

#### Defined in

[src/append.ts:33](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/append.ts#L33)

___

### isInMultisig

▸ `Const` **isInMultisig**(`multisig`, `signers`): `Promise`<[`Result`](../modules.md#result)<`boolean`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `multisig` | `PublicKey` |
| `signers` | `Keypair`[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`boolean`, `Error`\>\>

#### Defined in

[src/append.ts:73](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/append.ts#L73)
