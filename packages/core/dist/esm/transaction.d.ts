import { PublicKey, ParsedTransactionWithMeta, Commitment, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Transaction {
    const subscribeAccount: (pubkey: PublicKey, callback: any) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    interface TransferHistory {
        info: {
            destination?: string;
            source?: string;
            authority?: string;
            multisigAuthority?: string;
            signers?: string[];
            amount?: string;
            mint?: string;
            tokenAmount?: any[];
        };
        type: string;
        date: Date;
        innerInstruction: boolean;
        sig: string;
        memo?: string;
    }
    enum Filter {
        Transfer = "transfer",
        TransferChecked = "transferChecked",
        OnlyMemo = "spl-memo",
        MintTo = "mintTo",
        Create = "create"
    }
    enum DirectionFilter {
        Dest = "destination",
        Source = "source"
    }
    const get: (signature: string) => Promise<Result<ParsedTransactionWithMeta, Error>>;
    const getForAddress: (pubkey: PublicKey, limit?: number | undefined, before?: string | undefined, until?: string | undefined) => Promise<Result<ParsedTransactionWithMeta, Error>[]>;
    const getHistory: (searchPubkey: PublicKey, options?: {
        limit?: number | undefined;
        actionFilter?: Filter[] | undefined;
        directionFilter?: DirectionFilter | undefined;
    } | undefined) => Promise<Result<TransferHistory[], Error>>;
    const getTokenHistory: (tokenKey: PublicKey, searchPubkey: PublicKey, options?: {
        limit?: number | undefined;
        actionFilter?: Filter[] | undefined;
        directionFilter?: DirectionFilter | undefined;
    } | undefined) => Promise<Result<TransferHistory[], Error>>;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>>;
}
