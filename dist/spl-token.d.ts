import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction } from './';
export declare namespace SplToken {
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
    }
    interface TransferDestinationList {
        dest: PublicKey;
        date: Date;
    }
    const subscribeAccount: (pubkey: any, callback: any) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    const getTransferHistory: (pubkey: any, limit?: number | undefined) => Promise<Result<TransferHistory[], Error>>;
    const getTransferDestinationList: (pubkey: any) => Promise<Result<TransferDestinationList[], Error>>;
    const mint: (owner: any, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: any) => Promise<Result<Instruction, Error>>;
    const transfer: (tokenKey: any, owner: any, dest: any, signers: Signer[], amount: number, mintDecimal: number, feePayer?: any) => Promise<Result<Instruction, Error>>;
    const transferNft: (tokenKey: any, owner: any, dest: any, signers: Signer[], feePayer?: any) => Promise<Result<Instruction, Error>>;
}
