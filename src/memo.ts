import {
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionSignature
} from '@solana/web3.js';

import {Transaction} from './transaction';
import {Constants} from './constants';
import bs from 'bs58';

export namespace Memo {
  const MEMO_PROGRAMID = new PublicKey(Constants.MEMO_PROGRAMID);

  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();


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
    await Transaction.sendMySelf(signer, instruction);
}


