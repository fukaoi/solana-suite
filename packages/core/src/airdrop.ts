import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { Node, Result, debugLog } from '@solana-suite/shared';

export namespace Airdrop {
  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;
  export const MAX_AIRDROP_SOL = LAMPORTS_PER_SOL * 2;

  export const request = async (
    pubkey: PublicKey,
    airdropAmount?: number
  ): Promise<Result<string, Error>> => {
    debugLog('Now airdropping...please wait');

    airdropAmount = !airdropAmount
      ? DEFAULT_AIRDROP_AMOUNT
      : airdropAmount * LAMPORTS_PER_SOL;

    if (airdropAmount > MAX_AIRDROP_SOL) {
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
