import { PublicKey } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';

export namespace SolNative {
  export const findByOwner = async (owner: PublicKey) => {
    const accountInfo = await Node.getConnection()
      .getParsedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (accountInfo.isErr) {
      return Result.err(accountInfo.error);
    }
    return Result.ok({
      lamports: accountInfo.value.value?.lamports,
      sol: accountInfo.value.value?.lamports,
      owner: accountInfo.value.value?.owner.toString(),
      rentEpoch: accountInfo.value.value?.rentEpoch,
    });
  };
}
