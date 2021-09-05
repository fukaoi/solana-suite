import {
  Keypair,
  PublicKey,
  Transaction as SolanaTransaction,
  sendAndConfirmTransaction,
  TransactionInstruction,
  TransactionSignature,
  SystemProgram,
  Signer,
  AccountInfo,
} from '@solana/web3.js';

import {Util} from './util';
import {Constants} from './constants';

export namespace Transaction {

  export const get = async (signature: string) =>
    Util.getConnection().getTransaction(signature);

  export const getProgramAccounts = async (
    programId: PublicKey,
    configOrCommitment?: any,
  ): Promise<Array<any>> => {
    const extra: any = {};
    let commitment;

    if (configOrCommitment) {
      if (typeof configOrCommitment === 'string') {
        commitment = configOrCommitment;
      } else {
        commitment = configOrCommitment.commitment;
        if (configOrCommitment.dataSlice) {
          extra.dataSlice = configOrCommitment.dataSlice;
        }

        if (configOrCommitment.filters) {
          extra.filters = configOrCommitment.filters;
        }
      }
    }

    const connection = Util.getConnection();

    const args = connection._buildArgs([programId.toBase58()], commitment, 'base64', extra);
    const unsafeRes = await (connection as any)._rpcRequest(
      'getProgramAccounts',
      args,
    );

    const data = (
      unsafeRes.result as Array<{
        account: AccountInfo<[string, string]>;
        pubkey: string;
      }>
    ).map(item => {
      return {
        account: {
          data: item.account.data[0],
          executable: item.account.executable,
          lamports: item.account.lamports,
          owner: item.account.owner,
        },
        pubkey: item.pubkey,
      };
    });
    return data;
  }

  export const sendInstructions = async (
    signers: Keypair[],
    instructions: TransactionInstruction[],
  ): Promise<TransactionSignature> => {

    const conn = Util.getConnection();
    const tx = new SolanaTransaction().add(instructions[0]);
    if (instructions[1]) {
      instructions.slice(1, instructions.length).forEach((st: TransactionInstruction) => tx.add(st));
    }
    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, signers, options);
  }

  export const send = (
    sourcePublicKey: PublicKey,
    signers: Signer[],
    destPublicKey: PublicKey,
    amount: number,
  ) => async (instructions?: TransactionInstruction[]): Promise<TransactionSignature> => {
    const params =
      SystemProgram.transfer({
        fromPubkey: sourcePublicKey,
        toPubkey: destPublicKey,
        lamports: amount,
      });

    const conn = Util.getConnection();
    const tx = new SolanaTransaction().add(params);
    if (instructions) {
      instructions.forEach((st: TransactionInstruction) => tx.add(st));
    }

    const options = {
      skipPreflight: true,
      commitment: Constants.COMMITMENT,
    };
    return sendAndConfirmTransaction(conn, tx, signers, options);
  }
}
