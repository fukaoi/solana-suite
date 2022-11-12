import { Result, Instruction } from '@solana-suite/shared';
import { PublicKey, Keypair } from '@solana/web3.js';
export declare namespace Multisig {
    const create: (m: number, feePayer: Keypair, signerPubkey: PublicKey[]) => Promise<Result<Instruction, Error>>;
}
