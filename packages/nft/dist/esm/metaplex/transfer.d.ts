import { PublicKey, Signer } from '@solana/web3.js';
import { Instruction, Result, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace Metaplex {
    const transfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer?: Signer) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransferNft: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
