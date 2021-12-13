import { ParsedConfirmedTransaction, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { Result } from './';
export declare namespace Transaction {
    const get: (signature: string) => Promise<Result<ParsedConfirmedTransaction | unknown, Error>>;
    const getAll: (pubkey: any, limit?: number | undefined) => Promise<Result<ParsedConfirmedTransaction[] | unknown, Error>>;
    const confirmedSig: (signature: string, commitment?: any) => Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>>;
}
