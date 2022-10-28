import { PublicKey } from '@solana/web3.js';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

//@internal
export namespace Internals_SplToken {
  export const findAssociatedTokenAddress = async (
    mint: PublicKey,
    owner: PublicKey
  ): Promise<PublicKey> => {
    const address = await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    return address[0];
  };

  export const calculateAmount = (
    amount: number,
    mintDecimal: number
  ): number => {
    return amount * 10 ** mintDecimal;
  };
}
