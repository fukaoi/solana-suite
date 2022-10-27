import { PublicKey, Keypair } from '@solana/web3.js';
export declare namespace SplToken {
    const burn: (mint: PublicKey, owner: PublicKey, signers: Keypair[], burnAmount: number, tokenDecimals: number, feePayer?: Keypair) => Promise<void>;
}
