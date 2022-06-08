import {
  PublicKey,
} from '@solana/web3.js';

import {Constants, Result} from '@solana-suite/shared';

export namespace MetaplexAccount {
  export const findMetaplexAssocaiatedTokenAddress = async (
    mint: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        Constants.METAPLEX_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      Constants.METAPLEX_PROGRAM_ID,
    )
      .then(v => Result.ok(v[0]))
      .catch((e: Error) => Result.err(e))
  }
}
