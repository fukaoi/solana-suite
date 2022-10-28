import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Result } from '@solana-suite/shared';
export declare namespace SplToken {
    const burn: (mint: PublicKey, owner: PublicKey, signers: Keypair[], burnAmount: number, tokenDecimals: number, feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
}
