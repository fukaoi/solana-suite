import { PublicKey, Signer } from '@solana/web3.js';
import { Result } from './';
import { Instruction } from './instruction';
export declare namespace SolNative {
    const transferWithMultisig: (owner: PublicKey, dest: PublicKey, signers: Signer[], amountSol: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
    const transfer: (source: PublicKey, destination: PublicKey, signers: Signer[], amountSol: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
}
