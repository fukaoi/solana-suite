import { Result, Instruction } from './';
import { PublicKey } from '@solana/web3.js';
import * as BufferLayout from '@solana/buffer-layout';
export declare namespace Multisig {
    const isAddress: (multisig: any) => Promise<Result<boolean, Error>>;
    const getMultisigInfo: (multisig: any) => Promise<Result<BufferLayout.LayoutObject, Error>>;
    const create: (m: number, feePayer: any, signerPubkey: PublicKey[]) => Promise<Result<Instruction, Error>>;
}
