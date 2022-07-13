import { Keypair } from '@solana/web3.js';
import { Metaplex as MetaplexFoundation, CreateNftInput } from "@metaplex-foundation/js";
import { Instruction, Result } from '@solana-suite/shared';
export declare namespace Metaplex {
    const init: (feePayer: Keypair) => MetaplexFoundation;
    const mint: (input: CreateNftInput, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
}
