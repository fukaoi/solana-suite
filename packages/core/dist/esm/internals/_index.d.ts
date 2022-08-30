import { PublicKey, ParsedInstruction, Keypair } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace Internals {
    const retryGetOrCreateAssociatedAccountInfo: (mint: PublicKey, owner: PublicKey, feePayer: Keypair) => Promise<Result<string, Error>>;
    const isParsedInstruction: (arg: any) => arg is ParsedInstruction;
}
