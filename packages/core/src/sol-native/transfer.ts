import {
  createWrappedNativeAccount,
  createMint,
  createTransferInstruction,
  createCloseAccountInstruction,
} from '@solana/spl-token';

import {
  PublicKey,
  SystemProgram,
  Keypair,
  Transaction,
} from '@solana/web3.js';

import {
  Result,
  Node,
  Instruction,
  PartialSignInstruction,
  debugLog,
  Try,
} from '@solana-suite/shared';

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

      if (sourceToken.isErr) {
        throw sourceToken.error;
      }

      debugLog('# sourceToken: ', sourceToken.value);

      const destToken = await AssociatedAccount.retryGetOrCreate(
        token,
        wrapped,
        payer
      );

      if (destToken.isErr) {
        throw destToken.error;
      }

      debugLog('# destToken: ', destToken.value);

      const inst1 = createTransferInstruction(
        sourceToken.value.toPublicKey(),
        destToken.value.toPublicKey(),
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

  export const transfer = async (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const inst = SystemProgram.transfer({
        fromPubkey: source,
        toPubkey: destination,
        lamports: parseInt(`${amount.toLamports()}`, RADIX),
      });

      return new Instruction([inst], signers, feePayer);
    });
  };

  export const feePayerPartialSignTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const blockHashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        blockhash: blockHashObj.blockhash,
        lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
        feePayer,
      }).add(
        SystemProgram.transfer({
          fromPubkey: owner,
          toPubkey: dest,
          lamports: parseInt(`${amount.toLamports()}`, RADIX),
        })
      );

      signers.forEach((signer) => {
        tx.partialSign(signer);
      });

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex);
    });
  };
}
