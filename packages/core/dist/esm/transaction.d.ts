import { PublicKey, ParsedConfirmedTransaction, Commitment, RpcResponseAndContext, SignatureResult } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Transaction {
    const subscribeAccount: (pubkey: PublicKey, callback: any) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    interface TransferHistory {
        info: {
            destination: string;
            source: string;
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
    }
    interface TransferDestinationList {
        dest: PublicKey;
        date: Date;
    }
    enum Filter {
        Transfer = "transfer",
        TransferChecked = "transferChecked",
        Memo = "memo",
        MintTo = "mintTo",
        Create = "create"
    }
    enum DirectionType {
        Dest = "destination",
        Source = "source"
    }
    interface TransferFilter {
        filter: DirectionType;
        pubkey: PublicKey;
    }
    const get: (signature: string) => Promise<Result<ParsedConfirmedTransaction, Error>>;
    const getAll: (pubkey: PublicKey, limit?: number | undefined, before?: string | undefined, until?: string | undefined) => Promise<Result<ParsedConfirmedTransaction[], Error>>;
    const getTransactionHistory: (pubkey: PublicKey, filterOptions?: Filter[] | string[] | undefined, limit?: number | undefined, transferFilter?: TransferFilter | undefined) => Promise<Result<TransferHistory[], Error>>;
    const getTokenTransactionHistory: (tokenKey: PublicKey, pubkey: PublicKey, filterOptions?: Filter[] | string[] | undefined, limit?: number | undefined, transferFilter?: TransferFilter | undefined) => Promise<Result<TransferHistory[], Error>>;
    const getTransferTokenDestinationList: (pubkey: PublicKey) => Promise<Result<TransferDestinationList[], Error>>;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<Result<RpcResponseAndContext<SignatureResult> | unknown, Error>>;
}
