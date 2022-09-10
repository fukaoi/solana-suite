import { PublicKey } from '@solana/web3.js';
import { Node, Result, debugLog } from '@solana-suite/shared';

export namespace Airdrop {
  const DEFAULT_AIRDROP_AMOUNT = 1;
  const MAX_AIRDROP_SOL = 2;

  export const request = async (
    pubkey: PublicKey,
    airdropAmount?: number
  ): Promise<Result<string, Error>> => {
    debugLog('Now airdropping...please wait');

    airdropAmount = !airdropAmount
      ? DEFAULT_AIRDROP_AMOUNT.toLamports()
      : airdropAmount.toLamports();

    if (airdropAmount > MAX_AIRDROP_SOL.toLamports()) {
      return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`));
    }

    const sig = await Node.getConnection()
      .requestAirdrop(pubkey, airdropAmount)
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(Error(`Failed airdrop. ${sig.error.message}`));
    }
    await Node.confirmedSig(sig.value);
    return Result.ok('success');
  };
}
