import {PublicKey, Keypair} from "@solana/web3.js";

export type BundlrSigner = Keypair | Phantom | undefined;
export type Phantom = {
  connect: () => void,
  publicKey: PublicKey
}
