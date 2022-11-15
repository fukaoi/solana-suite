import { PublicKey } from '@solana/web3.js';
import { Node, Result, debugLog, Try } from '@solana-suite/shared';

export namespace Airdrop {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;

  export const request = async (
    pubkey: PublicKey,
    airdropAmount?: number
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      debugLog('Now airdropping...please wait');

      airdropAmount = !airdropAmount
        ? DEFAULT_AIRDROP_AMOUNT.toLamports()
        : airdropAmount.toLamports();

      if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
        throw Error(
          `Over max airdrop amount: ${airdropAmount}, max: ${MAX_AIRDROP_SOL.toLamports()}`
        );
      }

      const sig = await Node.getConnection().requestAirdrop(
        pubkey,
        airdropAmount
      );
      await Node.confirmedSig(sig);
      return 'success';
    });
  };
}
