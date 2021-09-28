import { Keypair, PublicKey, TransactionInstruction, TransactionSignature, Signer, AccountChangeCallback, ParsedConfirmedTransaction } from '@solana/web3.js';
export declare namespace Transaction {
    const get: (signature: string) => Promise<ParsedConfirmedTransaction | null>;
    const getAll: (pubkeyStr: string) => Promise<ParsedConfirmedTransaction[]>;
    const subscribeAccount: (pubkey: string, callback: AccountChangeCallback) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    const sendInstructions: (signers: Keypair[], instructions: TransactionInstruction[]) => Promise<TransactionSignature>;
    const send: (sourcePublicKey: PublicKey, signers: Signer[], destPublicKey: PublicKey, amount: number) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionSignature>;
}
