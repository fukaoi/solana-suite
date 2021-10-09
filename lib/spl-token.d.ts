import { Keypair, PublicKey, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
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
    const getTransferHistory: (pubkey: PublicKey, limit?: number | undefined) => Promise<TransferHistory[]>;
    const getTransferDestinationList: (pubkey: PublicKey) => Promise<TransferDestinationList[]>;
    const create: (source: Keypair, totalAmount: number, mintDecimal: number, authority?: PublicKey) => Promise<string>;
    const transfer: (tokenKey: PublicKey, source: Keypair, dest: PublicKey, amount: number, mintDecimal: number, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
}
