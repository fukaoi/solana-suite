import { debugLog, Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { AirdropOptions } from '~/types/airdrop';

export namespace Airdrop {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;

  export const request = async (
    pubkey: Pubkey,
    options: Partial<AirdropOptions> = {},
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('Now airdropping...please wait');

      const airdropAmount = !options.dropAmount
        ? DEFAULT_AIRDROP_AMOUNT.toLamports()
        : options.dropAmount.toLamports();

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
