/// <reference types="node" />
import { PublicKey, Signer } from '@solana/web3.js';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, signers: Signer[], owners?: PublicKey[], feePayer?: any) => any;
    const parse: (tx: any) => string;
}
