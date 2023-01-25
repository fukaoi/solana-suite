import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Result, PartialSignInstruction } from '@solana-suite/shared';
export declare namespace Metaplex {
    const transfer: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Keypair[], feePayer?: Keypair) => Promise<Result<Instruction, Error>>;
    const feePayerPartialSignTransferNft: (mint: PublicKey, owner: PublicKey, dest: PublicKey, signers: Keypair[], feePayer: PublicKey) => Promise<Result<PartialSignInstruction, Error>>;
}
