import {
  Keypair,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import {
  Result,
  Multisig
} from './';

export namespace Append {
  export interface Value {
    feePayer?: PublicKey,
    multiSig?: PublicKey,
    mintAuthority?: PublicKey,
    freezeAuthority?: PublicKey,
    txInstructions?: TransactionInstruction[],
  }

  export const isInFeePayer = (feePayer: PublicKey, signers: Keypair[]): boolean => {
    const res = signers.filter(s => s.publicKey.toString() === feePayer.toString());
    return res.length !== 0;
  }

  export const isInMultisig = async (multisig: PublicKey, signers: Keypair[])
    : Promise<Result<boolean, Error>> => {
    const info = await Multisig.getMultisigInfo(multisig);
    if (info.isErr) {
      return Result.err(info.error);
    }

    if (info.value.m !== signers.length) {
      return Result.ok(false);
    }

    const signerLabels = [
      'signer1', 'signer2', 'signer3', 'signer4', 'signer5',
      'signer6', 'signer7', 'signer8', 'signer9', 'signer10',
      'signer11'
    ];

    const registedSign = signerLabels.map(l => info.value[l].toString());
    const requetSign = signers.map(s => s.publicKey.toString());
    const res = requetSign.filter(r => registedSign.includes(r));
    return Result.ok(res.length === signers.length);
  }
}
