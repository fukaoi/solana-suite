import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, PostTokenAccount, UserSideOutput } from '../types/';
export declare namespace Convert.Memo {
    const intoUserSide: (output: InfraSideOutput.Memo, meta: ParsedTransactionWithMeta, outputTransfer?: InfraSideOutput.TransferChecked, mappingTokenAccount?: PostTokenAccount[]) => UserSideOutput.History | undefined;
}
