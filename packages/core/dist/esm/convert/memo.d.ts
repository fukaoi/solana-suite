import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, PostTokenAccount, UserSideOutput } from '../types/';
export declare namespace Convert.Memo {
    const intoUserSide: (output: InfraSideOutput.Memo, outputTransfer: InfraSideOutput.Transfer, meta: ParsedTransactionWithMeta, mappingTokenAccount?: PostTokenAccount[]) => UserSideOutput.History | undefined;
}
