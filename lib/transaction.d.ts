import { Keypair, PublicKey, TransactionInstruction, TransactionSignature, Signer, ParsedConfirmedTransaction, Commitment } from '@solana/web3.js';
export declare namespace Transaction {
    const get: (signature: string) => Promise<ParsedConfirmedTransaction | null>;
    const getAll: (pubkey: PublicKey, limit?: number | undefined) => Promise<ParsedConfirmedTransaction[]>;
    const confirmedSig: (signature: string, commitment?: Commitment) => Promise<void>;
    const sendInstructions: (signers: Keypair[], instructions: TransactionInstruction[]) => Promise<TransactionSignature>;
    const send: (source: PublicKey, signers: Signer[], destination: PublicKey, amount: number) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionSignature>;
}
