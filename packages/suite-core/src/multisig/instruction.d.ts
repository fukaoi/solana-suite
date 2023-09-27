import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
export declare namespace Multisig {
    const Layout: import("@solana/buffer-layout").Structure<{
        m: number;
        n: number;
        is_initialized: number;
        signer1: PublicKey;
        signer2: PublicKey;
        signer3: PublicKey;
        signer4: PublicKey;
        signer5: PublicKey;
        signer6: PublicKey;
        signer7: PublicKey;
        signer8: PublicKey;
        signer9: PublicKey;
        signer10: PublicKey;
        signer11: PublicKey;
    }>;
    const account: (newAccount: Keypair, feePayer: Keypair, balanceNeeded: number) => TransactionInstruction;
    const multisig: (m: number, feePayer: Keypair, signerPubkey: PublicKey[]) => TransactionInstruction;
}
