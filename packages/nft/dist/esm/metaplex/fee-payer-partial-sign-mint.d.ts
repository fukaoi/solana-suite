import { PartialSignInstruction, Pubkey, Result, Secret } from '@solana-suite/shared';
import { InputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Metaplex {
    const feePayerPartialSignMint: (owner: Pubkey, signer: Secret, input: InputNftMetadata, feePayer: Pubkey) => Promise<Result<PartialSignInstruction, Error>>;
}
