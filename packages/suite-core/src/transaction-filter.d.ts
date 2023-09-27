import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import { FilterType, ModuleName, UserSideOutput } from './types';
export declare namespace TransactionFilter {
    const isParsedInstruction: (arg: unknown) => arg is ParsedInstruction;
    const parse: (filterType: FilterType, moduleName: ModuleName) => (txMeta: ParsedTransactionWithMeta) => UserSideOutput.History | undefined;
}
