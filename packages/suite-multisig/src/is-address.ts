import { Result, Try } from '~/shared';
import { Pubkey } from '~/types/account';
import { Multisig as _Get } from './get-info';

export namespace Multisig {
  /**
   * Check if it is a multisig address
   *
   * @param {Pubkey} multisig // multisig account
   * @return Promise<Result<boolean, Error>>
   */
  export const isAddress = async (
    multisig: Pubkey,
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
