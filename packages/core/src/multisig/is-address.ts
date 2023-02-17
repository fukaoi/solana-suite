import { Pubkey, Result, Try } from '@solana-suite/shared';
import { Multisig as _Get } from './get-info';

export namespace Multisig {
  export const isAddress = async (
    multisig: Pubkey
  ): Promise<Result<boolean, Error>> => {
    return Try(async () => {
      const info = await _Get.getInfo(multisig);
      if (info.isErr) {
        return false;
      }
      return true;
    });
  };
}
