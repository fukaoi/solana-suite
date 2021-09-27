import { Keypair, PublicKey, TransactionInstruction, TransactionSignature, Signer, AccountChangeCallback } from '@solana/web3.js';
export declare namespace Transaction {
    const get: (signature: string) => Promise<import("@solana/web3.js").TransactionResponse | null>;
    const subscribeAccount: (pubkey: string, callback: AccountChangeCallback) => number;
    const unsubscribeAccount: (subscribeId: number) => Promise<void>;
    const sendInstructions: (signers: Keypair[], instructions: TransactionInstruction[]) => Promise<TransactionSignature>;
    const send: (sourcePublicKey: PublicKey, signers: Signer[], destPublicKey: PublicKey, amount: number) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionSignature>;
}
