import { PartialSignInstruction, Pubkey, Result, Secret } from '@solana-suite/shared';
export declare namespace Metaplex {
    const feePayerPartialSignTransferNft: (mint: Pubkey, owner: Pubkey, dest: Pubkey, signers: Secret[], feePayer: Pubkey) => Promise<Result<PartialSignInstruction, Error>>;
}
