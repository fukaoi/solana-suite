export { S as StorageType } from './type-ed05193d.js';
import { Keypair, PublicKey } from '@solana/web3.js';

type BundlrSigner = Keypair | PhantomWallet | undefined;
type PhantomWallet = {
    publicKey: PublicKey;
};

export { BundlrSigner, PhantomWallet };
