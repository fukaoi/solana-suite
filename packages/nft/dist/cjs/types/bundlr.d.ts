import { PublicKey, Keypair } from "@solana/web3.js";
export declare type BundlrSigner = Keypair | Phantom | undefined;
export declare type Phantom = {
    connect: () => void;
    publicKey: PublicKey;
};
