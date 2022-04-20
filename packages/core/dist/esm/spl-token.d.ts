import { AccountInfo, Token } from '@solana/spl-token';
import { PublicKey, Signer } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
export declare namespace SplToken {
    const retryGetOrCreateAssociatedAccountInfo: (token: Token, owner: PublicKey) => Promise<Result<AccountInfo, Error>>;
    const mint: (owner: PublicKey, signers: Signer[], totalAmount: number, mintDecimal: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
    const transfer: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], amount: number, mintDecimal: number, feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
    const transferNft: (tokenKey: PublicKey, owner: PublicKey, dest: PublicKey, signers: Signer[], feePayer?: Signer | undefined) => Promise<Result<Instruction, Error>>;
}
