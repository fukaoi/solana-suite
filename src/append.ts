import {LayoutObject} from '@solana/buffer-layout';
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
  const signerLabels = [
    'signer1', 'signer2', 'signer3', 'signer4', 'signer5',
    'signer6', 'signer7', 'signer8', 'signer9', 'signer10',
    'signer11'
  ];

  const filterInfo = (info: LayoutObject, signers: Keypair[]): Keypair[] => {
    const registedSign = signerLabels.map(l => info.value[l].toString());
    return signers.filter(r => registedSign.includes(r.publicKey.toBase58()));
  }

  export interface Value {
    feePayer?: PublicKey,
    multiSig?: PublicKey,
    mintAuthority?: PublicKey,
    freezeAuthority?: PublicKey,
    txInstructions?: TransactionInstruction[],
  }

  export const isInFeePayer = (feePayer: PublicKey, signers: Keypair[]): boolean => {
    const res = signers.filter(s => s.publicKey.toString() === feePayer.toString());
    return res.length > 0;
  }

  export const extractOnlySignerKeypair = async (
    signers: Keypair[],
    feePayer?: PublicKey | undefined,
    multisig?: PublicKey | undefined,
  ): Promise<Result<Keypair[] | Error>> => {
    let exFeepayer: Keypair[] = [];
    if (feePayer) {
      exFeepayer = extractFeePayerKeypair(signers, feePayer);
    }
    let exMultisig: Keypair[] = [];
    if (multisig) {
      const resEx = await extractMultiSigKeypair(signers, multisig);
      if (resEx.isErr) return resEx;
      exMultisig = resEx.unwrap() as Keypair[];
    }

    const concated = exFeepayer.concat(exMultisig);

    const res = signers.filter(f => !concated.includes(f));
    if (res.length === 0) return Result.err(Error('Not found keypair for signer'));
    return Result.ok(res);
  }

  export const extractFeePayerKeypair = (signers: Keypair[], feePayer: PublicKey): Keypair[] =>
    signers.filter(s => s.publicKey.toString() === feePayer.toString());

  export const extractMultiSigKeypair = async (signers: Keypair[], multisig: PublicKey)
    : Promise<Result<Keypair[] | Error>> => {
    const info = await Multisig.getMultisigInfo(multisig);
    if (info.isErr) {
      return Result.err(info.error);
    }
    return Result.ok(filterInfo(info, signers));
  }

  export const isInMultisig = async (multisig: PublicKey, signers: Keypair[])
    : Promise<Result<boolean, Error>> => {

    const info = await Multisig.getMultisigInfo(multisig);
    if (info.isErr) {
      return Result.err(info.error);
    }
    const res = filterInfo(info, signers);
    return Result.ok(res.length === info.value.m);
  }
}
