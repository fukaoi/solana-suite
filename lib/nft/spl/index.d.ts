import { Keypair, PublicKey, TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplNft {
    const create: (source: Keypair, authority?: PublicKey) => Promise<string>;
    const transfer: (tokenKey: PublicKey, source: Keypair, dest: PublicKey, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
}
