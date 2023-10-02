import { Result, debugLog, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';

export namespace Airdrop {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;

  export const request = async (
    pubkey: Pubkey,
    airdropAmount?: number,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('Now airdropping...please wait');

      airdropAmount = !airdropAmount
        ? DEFAULT_AIRDROP_AMOUNT.toLamports()
        : airdropAmount.toLamports();

      if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
        throw Error(
          `Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`,
        );
      }

      const sig = await Node.getConnection().requestAirdrop(
        pubkey.toPublicKey(),
        airdropAmount,
      );
      await Node.confirmedSig(sig);
      return 'success';
    });
  };
}
