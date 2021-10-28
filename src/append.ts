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
    const res = signers.filter(s => s.publicKey === feePayer);
    return res.length !== 0;
  }

  export const isInMultisig = async (multisig: PublicKey, signers: Keypair[])
    : Promise<Result<boolean, Error>> => {
    const info = await Multisig.getMultisigInfo(multisig);
    if (info.isErr) {
      return Result.err(info.error);
    }
    const res = signers.filter(s => info.value.indexOf(s) === 1);
    return Result.ok(res.length === signers.length);
  }
}
