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
    const subscribeAccount: (pubkey: PublicKey, callback: any) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    const getTransferHistory: (pubkey: PublicKey, limit?: number | undefined) => Promise<Result<TransferHistory[], Error>>;
    const getTransferDestinationList: (pubkey: PublicKey) => Promise<Result<TransferDestinationList[], Error>>;
    const mint: (owner: PublicKey, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
    const transfer: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
    const transferNft: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
}
