import { Signer } from '@solana/web3.js';
import { Result } from './';
import { Instruction } from './instruction';
export declare namespace SolNative {
    const transferWithMultisig: (owner: any, dest: any, signers: Signer[], amountSol: number, feePayer?: any) => Promise<Result<Instruction, Error>>;
    const transfer: (source: any, destination: any, signers: Signer[], amountSol: number, feePayer?: any) => Promise<Result<Instruction, Error>>;
}
