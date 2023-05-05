import { ParsedInstruction, ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';
import { DirectionFilter, UserSideOutput } from '../types/';
export declare namespace Convert.MintTo {
    const intoUserSide: (searchKey: PublicKey, instruction: ParsedInstruction, value: ParsedTransactionWithMeta, directionFilter?: DirectionFilter) => UserSideOutput.History | undefined;
}
