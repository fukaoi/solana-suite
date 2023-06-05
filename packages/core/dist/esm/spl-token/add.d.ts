import { Result, Instruction, Pubkey, Secret } from '@solana-suite/shared';
export declare namespace SplToken {
    const add: (token: Pubkey, owner: Pubkey, signers: Secret[], totalAmount: number, mintDecimal: number, feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}
//# sourceMappingURL=add.d.ts.map