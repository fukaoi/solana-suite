import { PublicKey, ParsedConfirmedTransaction, Commitment, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Transaction {
    const get: (signature: string) => Promise<Result<ParsedConfirmedTransaction | unknown, Error>>;
    const getAll: (pubkey: PublicKey, limit?: number | undefined) => Promise<Result<ParsedConfirmedTransaction[] | unknown, Error>>;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>>;
}
