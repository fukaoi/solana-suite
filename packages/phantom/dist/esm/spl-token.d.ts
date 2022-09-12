import { Transaction, PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
export declare namespace SplToken {
    const mint: (owner: PublicKey, cluster: string, totalAmount: number, mintDecimal: number, signTransaction: (tx: Transaction | Transaction[]) => any) => Promise<Result<string, Error>>;
    const addMinting: (tokenKey: PublicKey, owner: PublicKey, cluster: string, totalAmount: number, mintDecimal: number, signTransaction: (tx: Transaction | Transaction[]) => any) => Promise<Result<string, Error>>;
}
