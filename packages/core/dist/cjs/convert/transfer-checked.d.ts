import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, PostTokenAccount, UserSideOutput } from '../types/';
export declare namespace Convert.TransferChecked {
    const intoUserSide: (output: InfraSideOutput.TransferChecked, meta: ParsedTransactionWithMeta, mappingTokenAccount?: PostTokenAccount[]) => UserSideOutput.History | undefined;
}
