import {
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionSignature
} from '@solana/web3.js';

import {_Transaction} from './_transaction';
import {Constants} from './constants';

export namespace Memo {
  const MEMO_PROGRAMID = new PublicKey(Constants.MEMO_PROGRAMID);

  export const decode = (instruction: TransactionInstruction): string =>
    instruction.data.toString();

  export const encode = (data: any): Buffer => Buffer.from(data);

  export const createInstruction = (data: any): TransactionInstruction => {
    return new TransactionInstruction({
      programId: MEMO_PROGRAMID,
      data: encode(data),
      keys: []
    });
  };

  export const own = async (
    instruction: TransactionInstruction,
    signer: Keypair
  ): Promise<TransactionSignature> =>
    await _Transaction.sendMySelf(signer, instruction);
}


