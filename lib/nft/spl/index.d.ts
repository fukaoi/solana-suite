import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplNft {
    const create: (sourceSecret: string, authority?: string) => Promise<string>;
    const transfer: (tokenKey: string, sourceSecret: string, destPubkey: string, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
}
