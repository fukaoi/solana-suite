import { Result, Instruction, Secret, Pubkey } from '@solana-suite/shared';
export declare namespace Multisig {
    const create: (m: number, feePayer: Secret, signerPubkey: Pubkey[]) => Promise<Result<Instruction, Error>>;
}
