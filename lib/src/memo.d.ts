/// <reference types="node" />
import { ParsedConfirmedTransaction, PublicKey, Signer } from '@solana/web3.js';
import { Instruction } from './';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, signers: Signer[], owners?: PublicKey[], feePayer?: Signer | undefined) => Instruction;
    const parse: (tx: ParsedConfirmedTransaction) => string;
}
