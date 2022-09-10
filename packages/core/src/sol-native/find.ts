import {
  ParsedAccountData,
  PublicKey,
} from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
import { SolNativeOwnerInfo } from '../types/sol-native';
import {Internals_History} from '../internals/_history';

export namespace SolNative {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<SolNativeOwnerInfo, Error>> => {
    const res = await Node.getConnection()
      .getParsedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) {
      return Result.err(res.error);
    }

    const info = {
      sol: 0,
      lamports: 0,
      owner: owner.toString(),
    };

    if (Internals_History.isParsedInstruction(res.unwrap().value?.data)) {
      info.owner = (
        res.value.value?.data as ParsedAccountData
      ).parsed.info.owner;
    }

    if (res.value.value) {
      info.lamports = res.value.value?.lamports;
      info.sol = res.value.value?.lamports.toSol();
    }
    return Result.ok(info);
  };
}
