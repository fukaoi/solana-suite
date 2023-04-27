import { Instruction, Pubkey, Result, Secret } from '@solana-suite/shared';
export declare namespace Metaplex {
    const transfer: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], feePayer?: Secret) => Promise<Result<Instruction, Error>>;
}
