import { Result, Secret, Pubkey, PartialSignInstruction } from '@solana-suite/shared';
import { InputNftMetadata } from '@solana-suite/shared-metaplex';
export declare namespace Metaplex {
    const feePayerPartialSignMint: (owner: Pubkey, signer: Secret, input: InputNftMetadata, feePayer?: Secret) => Promise<Result<PartialSignInstruction, Error>>;
}
