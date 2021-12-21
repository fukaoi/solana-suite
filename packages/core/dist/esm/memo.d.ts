/// <reference types="node" />
import { ParsedConfirmedTransaction, PublicKey, Signer } from '@solana/web3.js';
import { Instruction } from '@solana-suite/shared';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, owners: PublicKey[], signers: Signer[], feePayer?: Signer | undefined) => Instruction;
    const parse: (tx: ParsedConfirmedTransaction) => string;
}
