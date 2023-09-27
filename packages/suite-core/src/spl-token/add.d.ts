import { Result, Instruction, Pubkey, Secret } from 'shared';
export declare namespace SplToken {
    const add: (token: Pubkey, owner: Pubkey, signers: Secret[], totalAmount: number, mintDecimal: number, feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}
