/// <reference types="node" />
import { Keypair, PublicKey, TransactionInstruction, TransactionSignature, Signer, ParsedConfirmedTransaction, AccountChangeCallback, Commitment } from '@solana/web3.js';
export declare namespace Transaction {
    const parseAccountData: (data: Buffer) => {
        token: PublicKey;
        owner: PublicKey;
        amount: number;
    };
    const get: (signature: string) => Promise<ParsedConfirmedTransaction | null>;
    const getAll: (pubkey: PublicKey) => Promise<ParsedConfirmedTransaction[]>;
    const subscribeAccount: (pubkey: PublicKey, callback: AccountChangeCallback) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<void>;
    const sendInstructions: (signers: Keypair[], instructions: TransactionInstruction[]) => Promise<TransactionSignature>;
    const send: (source: PublicKey, signers: Signer[], destination: PublicKey, amount: number) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionSignature>;
}
