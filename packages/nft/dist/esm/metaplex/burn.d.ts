import { Instruction, Pubkey, Result, Secret } from '@solana-suite/shared';
export declare namespace Metaplex {
    const burn: (mint: Pubkey, owner: Pubkey, signers: Secret[], feePayer?: Secret) => Result<Instruction, Error>;
}
