[solana-suite](../README.md) / [Exports](../modules.md) / Multisig

# Namespace: Multisig

## Table of contents

### Functions

- [create](Multisig.md#create)
- [getMultisigInfo](Multisig.md#getmultisiginfo)
- [isAddress](Multisig.md#isaddress)

## Functions

### create

▸ `Const` **create**(`m`, `feePayer`, `signerPubkey`): `Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `number` |
| `feePayer` | `Signer` |
| `signerPubkey` | `PublicKey`[] |

#### Returns

`Promise`<[`Result`](../modules.md#result)<[`Instruction`](../classes/Instruction.md), `Error`\>\>

#### Defined in

[src/multisig.ts:144](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/multisig.ts#L144)

___

### getMultisigInfo

▸ `Const` **getMultisigInfo**(`multisig`): `Promise`<[`Result`](../modules.md#result)<`LayoutObject`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `multisig` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`LayoutObject`, `Error`\>\>

#### Defined in

[src/multisig.ts:114](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/multisig.ts#L114)

___

### isAddress

▸ `Const` **isAddress**(`multisig`): `Promise`<[`Result`](../modules.md#result)<`boolean`, `Error`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `multisig` | `PublicKey` |

#### Returns

`Promise`<[`Result`](../modules.md#result)<`boolean`, `Error`\>\>

#### Defined in

[src/multisig.ts:104](https://github.com/fukaoi/solana-suite/blob/d1cae4f/src/multisig.ts#L104)
