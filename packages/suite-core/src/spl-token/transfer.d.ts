import { Result, Instruction, Pubkey, Secret } from 'shared';
export declare namespace SplToken {
    const transfer: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], amount: number, mintDecimal: number, feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}