import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Node, Result, Try } from '@solana-suite/shared';
import { SplTokenOwnerInfo } from '../types/spl-token';

export namespace SplToken {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<SplTokenOwnerInfo[], Error>> => {
    return Try(async () => {
      const accounts = await Node.getConnection().getParsedTokenAccountsByOwner(
        owner,
        {
          programId: TOKEN_PROGRAM_ID,
        }
      );

      const info = accounts.value.reduce((arr, d) => {
        if (d.account.data.parsed.info.tokenAmount.uiAmount > 0) {
          arr.push({
            owner: owner.toString(),
            mint: d.account.data.parsed.info.mint as string,
            amount: d.account.data.parsed.info.tokenAmount.uiAmount as number,
            tokenAccount: d.pubkey.toString(),
            mintDecimal: d.account.data.parsed.info.tokenAmount
              .decimals as number,
          });
        }
        return arr;
      }, [] as SplTokenOwnerInfo[]);

      return info;
    });
  };
}
