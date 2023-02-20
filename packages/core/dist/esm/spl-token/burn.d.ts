import { Instruction, Result, Pubkey, Secret } from '@solana-suite/shared';
export declare namespace SplToken {
    const burn: (mint: Pubkey, owner: Pubkey, signers: Secret[], burnAmount: number, tokenDecimals: number, feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}
