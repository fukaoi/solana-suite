import { Keypair, PublicKey } from '@solana/web3.js';
import { P as PhantomProvider } from './phantom-e9a40784.js';

type BundlrSigner = Keypair | PhantomWallet | undefined;
type PhantomWallet = {
    publicKey: PublicKey;
};
type FileType = string | File;
type UploadableFileType = string & File;
type Identity = Secret | PhantomProvider;
type Tags = [{
    name: string;
    value: string;
}];

type StorageType = 'nftStorage' | 'arweave' | string;

export { BundlrSigner, FileType, Identity, PhantomWallet, StorageType, Tags, UploadableFileType };
