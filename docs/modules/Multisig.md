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

[src/multisig.ts:148](https://github.com/fukaoi/solana-suite/blob/077409e/src/multisig.ts#L148)

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

[src/multisig.ts:118](https://github.com/fukaoi/solana-suite/blob/077409e/src/multisig.ts#L118)

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

[src/multisig.ts:108](https://github.com/fukaoi/solana-suite/blob/077409e/src/multisig.ts#L108)
