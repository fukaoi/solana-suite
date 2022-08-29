import { PublicKey, ParsedTransactionWithMeta, ParsedInstruction } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { TransferHistory, DirectionFilter, Filter } from '../types/history';
export declare namespace Internals_History {
    const isParsedInstruction: (arg: any) => arg is ParsedInstruction;
    const filterTransactions: (searchKey: PublicKey, transactions: Result<ParsedTransactionWithMeta>[], filterOptions: Filter[], isToken?: boolean, directionFilter?: DirectionFilter) => TransferHistory[];
    const get: (signature: string) => Promise<Result<ParsedTransactionWithMeta, Error>>;
    const getForAddress: (pubkey: PublicKey, limit?: number | undefined, before?: string | undefined, until?: string | undefined) => Promise<Result<ParsedTransactionWithMeta, Error>[]>;
}
