import { Instruction, Pubkey, Result, Secret } from '@solana-suite/shared';
export declare namespace SplToken {
    const burn: (mint: Pubkey, owner: Pubkey, signers: Secret[], burnAmount: number, tokenDecimals: number, feePayer?: Secret) => Result<Instruction, Error>;
}
//# sourceMappingURL=burn.d.ts.map