import {
  createWrappedNativeAccount,
  createMint,
  createTransferInstruction,
  createCloseAccountInstruction,
} from '@solana/spl-token';

import { PublicKey, Keypair } from '@solana/web3.js';

import { Result, Node, Instruction, debugLog, Try } from '@solana-suite/shared';

import { AssociatedAccount } from '../associated-account';

export namespace SolNative {
  const RADIX = 10;

  // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const transferWithMultisig = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const connection = Node.getConnection();
      const payer = feePayer ? feePayer : signers[0];
      const wrapped = await createWrappedNativeAccount(
        connection,
        payer,
        owner,
        parseInt(`${amount.toLamports()}`, RADIX)
      );

      debugLog('# wrapped sol: ', wrapped.toBase58());

      const token = await createMint(connection, payer, owner, owner, 0);

      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        payer
      );

      debugLog('# sourceToken: ', sourceToken);

      const destToken = await AssociatedAccount.retryGetOrCreate(
        token,
        wrapped,
        payer
      );

      debugLog('# destToken: ', destToken);

      const inst1 = createTransferInstruction(
        sourceToken.toPublicKey(),
        destToken.toPublicKey(),
        owner,
        parseInt(`${amount}`, RADIX), // No lamports, its sol
        signers
      );

      const inst2 = createCloseAccountInstruction(
        wrapped,
        dest,
        owner,
        signers
      );

      return new Instruction([inst1, inst2], signers, feePayer);
    });
  };
}
