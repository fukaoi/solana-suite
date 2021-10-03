import { Keypair, PublicKey, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SolNative {
    const transfer: (source: PublicKey, signers: Keypair[], destination: PublicKey, amount: number) => (instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
}
