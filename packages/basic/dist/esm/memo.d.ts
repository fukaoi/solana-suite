/// <reference types="node" />
import { ParsedConfirmedTransaction, PublicKey, Signer } from '@solana/web3.js';
export declare namespace Memo {
    const decode: (encoded: string) => string;
    const encode: (data: string) => Buffer;
    const create: (data: string, owners: PublicKey[], signers: Signer[], feePayer?: Signer | undefined) => any;
    const parse: (tx: ParsedConfirmedTransaction) => string;
}
