import { Result, Instruction, Pubkey, Secret } from 'shared';
export declare namespace SolNative {
    const transfer: (source: Pubkey, dest: Pubkey, signers: Secret[], amount: number, feePayer?: Secret) => Result<Instruction, Error>;
}
