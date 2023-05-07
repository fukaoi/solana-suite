import { ParsedTransactionWithMeta } from '@solana/web3.js';
import { InfraSideOutput, UserSideOutput } from '../types/';
export declare namespace Convert.Mint {
    const intoUserSide: (output: InfraSideOutput.MintTo, value: ParsedTransactionWithMeta) => UserSideOutput.History | undefined;
}
