import { ParsedAccountData, PublicKey } from '@solana/web3.js';
import { Node, Result, Try } from '@solana-suite/shared';
import { SolNativeOwnerInfo } from '../types/sol-native';
import { Internals_History } from '../internals/_history';

export namespace SolNative {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<SolNativeOwnerInfo, Error>> => {
    return Try(async () => {
      const res = await Node.getConnection().getParsedAccountInfo(owner);

      const info = {
        sol: 0,
        lamports: 0,
        owner: owner.toString(),
      };

      if (Internals_History.isParsedInstruction(res.value?.data)) {
        info.owner = (res.value?.data as ParsedAccountData).parsed.info.owner;
      }

      if (res.value) {
        info.lamports = res.value?.lamports;
        info.sol = res.value?.lamports.toSol();
      }
      return info;
    });
  };
}
