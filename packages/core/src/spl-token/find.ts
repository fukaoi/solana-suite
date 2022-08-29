import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
import { TokenInfoOwned } from '../types/spl-token';

export namespace SplToken {
  export const findByOwner = async (
    pubkey: PublicKey
  ): Promise<Result<TokenInfoOwned[], Error>> => {
    const res = await Node.getConnection()
      .getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID,
      })
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) {
      return Result.err(res.error);
    }

    const modified = res.unwrap().value.map((d) => {
      return {
        mint: d.account.data.parsed.info.mint,
        tokenAmount: d.account.data.parsed.info.tokenAmount.uiAmount,
      };
    });

    return Result.ok(modified);
  };
}
