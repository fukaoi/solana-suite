import { Result, Instruction, Pubkey, Secret } from 'shared';
export declare namespace SolNative {
    const transferWithMultisig: (owner: Pubkey, dest: Pubkey, signers: Secret[], amount: number, feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}
