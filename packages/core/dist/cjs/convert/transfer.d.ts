import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { DirectionFilter, InfraSideOutput, MappingTokenAccount, UserSideOutput, WithMemo } from '../types/';
export declare namespace Convert.Transfer {
    const intoUserSide: (searchKey: PublicKey, output: InfraSideOutput.Transfer, meta: ParsedTransactionWithMeta, directionFilter?: DirectionFilter, mappingTokenAccount?: MappingTokenAccount[], isToken?: boolean, withMemos?: WithMemo[]) => UserSideOutput.History | undefined;
}
