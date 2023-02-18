import { Instruction, Result, PartialSignInstruction, Pubkey, Secret } from '@solana-suite/shared';
export declare namespace Metaplex {
    const transfer: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], feePayer?: Secret) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransferNft: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], feePayer: Pubkey) => Promise<Result<PartialSignInstruction, Error>>;
}
