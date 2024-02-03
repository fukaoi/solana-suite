import { ParsedAccountData } from '@solana/web3.js';
import { Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { OwnerInfo, Pubkey } from '~/types/account';
import { TransactionFilter } from '~/transaction-filter';

export namespace SolNative {
  /**
   * Find nft by owner address
   *
   * @param {Pubkey} owner
   * @return Promise<Result<OwnerInfo, Error>>
   */
  export const findByOwner = async (
    owner: Pubkey,
  ): Promise<Result<OwnerInfo, Error>> => {
    return Try(async () => {
      const res = await Node.getConnection().getParsedAccountInfo(
        owner.toPublicKey(),
      );

      const info = {
        sol: 0,
        lamports: 0,
        owner: owner.toString(),
      };

      if (TransactionFilter.isParsedInstruction(res.value?.data)) {
        const parsedAccountData = res.value?.data as ParsedAccountData;
        info.owner = parsedAccountData.parsed?.info?.owner as string;
      }

      if (res.value) {
        info.lamports = res.value?.lamports;
        info.sol = res.value?.lamports.toSol();
      }
      return info;
    });
  };
}
