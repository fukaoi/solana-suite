import {
  createCloseAccountInstruction,
  createMint,
  createTransferInstruction,
  createWrappedNativeAccount,
} from '@solana/spl-token';

import { debugLog, Result, Try } from '~/shared';
import { Transaction } from '~/transaction';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { Account } from '~/account';

export namespace SolNative {
  const RADIX = 10;

  // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const transferWithMultisig = async (
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    feePayer?: Secret,
  ): Promise<Result<Transaction, Error>> => {
    return Try(async () => {
      const connection = Node.getConnection();
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());
      const wrapped = await createWrappedNativeAccount(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        parseInt(`${amount.toLamports()}`, RADIX),
      );

      debugLog('# wrapped sol: ', wrapped.toBase58());

      const token = await createMint(
        connection,
        payer.toKeypair(),
        owner.toPublicKey(),
        owner.toPublicKey(),
        0,
      );

      const sourceToken = await Account.Associated.retryGetOrCreate(
        token.toString(),
        owner,
        payer,
      );

      debugLog('# sourceToken: ', sourceToken);

      const destToken = await Account.Associated.retryGetOrCreate(
        token.toString(),
        wrapped.toString(),
        payer,
      );

      debugLog('# destToken: ', destToken);

      const inst1 = createTransferInstruction(
        sourceToken.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        parseInt(`${amount}`, RADIX), // No lamports, its sol
        keypairs,
      );

      const inst2 = createCloseAccountInstruction(
        wrapped,
        dest.toPublicKey(),
        owner.toPublicKey(),
        keypairs,
      );

      return new Transaction(
        [inst1, inst2],
        signers.map((s) => s.toKeypair()),
        feePayer?.toKeypair(),
      );
    });
  };
}
