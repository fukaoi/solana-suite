import { ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { DirectionFilter, InfraSideOutput, UserSideOutput } from '../types/';
export declare namespace Convert.Memo {
    const intoUserSide: (searchKey: PublicKey, output: InfraSideOutput.Memo, value: ParsedTransactionWithMeta, directionFilter?: DirectionFilter) => UserSideOutput.History | undefined;
}
