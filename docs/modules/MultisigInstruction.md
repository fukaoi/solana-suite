[solana-suite](../README.md) / [Exports](../modules.md) / MultisigInstruction

# Namespace: MultisigInstruction

## Table of contents

### Variables

- [Layout](MultisigInstruction.md#layout)

### Functions

- [account](MultisigInstruction.md#account)
- [multisig](MultisigInstruction.md#multisig)

## Variables

### Layout

• **Layout**: `Structure`

#### Defined in

[src/multisig.ts:21](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/multisig.ts#L21)

## Functions

### account

▸ `Const` **account**(`newAccount`, `feePayer`, `balanceNeeded`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newAccount` | `Signer` |
| `feePayer` | `Signer` |
| `balanceNeeded` | `number` |

#### Returns

`TransactionInstruction`

#### Defined in

[src/multisig.ts:38](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/multisig.ts#L38)

___

### multisig

▸ `Const` **multisig**(`m`, `feePayer`, `signerPubkey`): `TransactionInstruction`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `number` |
| `feePayer` | `Signer` |
| `signerPubkey` | `PublicKey`[] |

#### Returns

`TransactionInstruction`

#### Defined in

[src/multisig.ts:54](https://github.com/fukaoi/solana-suite/blob/5119ed2/src/multisig.ts#L54)
