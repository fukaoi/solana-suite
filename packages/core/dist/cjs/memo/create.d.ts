/// <reference types="node" />
import { Instruction, Pubkey, Secret } from '@solana-suite/shared';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, owner: Pubkey, signer: Secret, feePayer?: Secret) => Instruction;
}
