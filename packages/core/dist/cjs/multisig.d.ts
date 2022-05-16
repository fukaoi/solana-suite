import { Result, Instruction } from '@solana-suite/shared';
import { PublicKey, Signer } from '@solana/web3.js';
import { LayoutObject } from '@solana/buffer-layout';
export declare namespace Multisig {
    const isAddress: (multisig: PublicKey) => Promise<Result<boolean, Error>>;
    const getMultisigInfo: (multisig: PublicKey) => Promise<Result<LayoutObject, Error>>;
    const create: (m: number, feePayer: Signer, signerPubkey: PublicKey[]) => Promise<Result<Instruction, Error>>;
}
