import { Keypair, PublicKey } from '@solana/web3.js';
export type BundlrSigner = Keypair | Phantom | undefined;
export type Phantom = {
    publicKey: PublicKey;
};
//# sourceMappingURL=bundlr.d.ts.map