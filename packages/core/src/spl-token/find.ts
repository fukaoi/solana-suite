import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
import { SplTokenOwnerInfo } from '../types/spl-token';

export namespace SplToken {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<SplTokenOwnerInfo[], Error>> => {
    const res = await Node.getConnection()
      .getParsedTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
      })
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) {
      return Result.err(Error(res.error));
    }

    const info = res.unwrap().value.reduce((arr, d) => {
      if (d.account.data.parsed.info.tokenAmount.uiAmount > 0) {
        arr.push({
          owner: owner.toString(),
          mint: d.account.data.parsed.info.mint,
          amount: d.account.data.parsed.info.tokenAmount.uiAmount,
          tokenAccount: d.pubkey.toString(),
          mintDecimal: d.account.data.parsed.info.tokenAmount.decimals,
        });
      }
      return arr;
    }, [] as SplTokenOwnerInfo[]);

    return Result.ok(info);
  };
}
