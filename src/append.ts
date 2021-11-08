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

  export const extractOnlySignerKeypair = async(
    feePayer: PublicKey, 
    multisig: PublicKey, 
    signers: Keypair[]
   ): Promise<Result<Keypair[] | Error>> => {
    const extracted = extractFeePayerKeypair(feePayer, signers);
    return extractMultiSigKeypair(multisig, extracted);
  }

  export const extractFeePayerKeypair = (feePayer: PublicKey, signers: Keypair[]): Keypair[] =>
    signers.filter(s => s.publicKey.toString() === feePayer.toString());

  export const extractMultiSigKeypair = async (multisig: PublicKey, signers: Keypair[])
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
