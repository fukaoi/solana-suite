import { Result, Instruction } from '@solana-suite/shared';
import { PublicKey, Signer } from '@solana/web3.js';
import * as BufferLayout from 'old-buffer';
export declare namespace Multisig {
    const isAddress: (multisig: PublicKey) => Promise<Result<boolean, Error>>;
    const getMultisigInfo: (multisig: PublicKey) => Promise<Result<BufferLayout.LayoutObject, Error>>;
    const create: (m: number, feePayer: Signer, signerPubkey: PublicKey[]) => Promise<Result<Instruction, Error>>;
}
