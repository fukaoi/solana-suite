import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SolNative {
    const transfer: (sourcePubkey: string, signerSecrets: string[], destPubkey: string, amount: number) => (instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
}
