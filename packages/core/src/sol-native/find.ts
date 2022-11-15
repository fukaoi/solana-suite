import { ParsedAccountData, PublicKey } from '@solana/web3.js';
import { Node, Result, Try } from '@solana-suite/shared';
import { SolNativeOwnerInfo } from '../types/sol-native';
import { SolNative as _Is } from './is-parsed-instruction';

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

      if (_Is.isParsedInstruction(res.value?.data)) {
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
