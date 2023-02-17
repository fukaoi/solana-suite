import { Keypair, PublicKey } from '@solana/web3.js';
import bs from 'bs58';
export class KeyPair {
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPublicKey() {
        return new PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs.decode(this.secret);
        return Keypair.fromSecretKey(decoded);
    }
}
KeyPair.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeyPair.isSecret = (value) => /^[0-9a-zA-Z]{88}$/.test(value);
KeyPair.create = () => {
    const keypair = Keypair.generate();
    return new KeyPair(keypair.publicKey.toBase58(), bs.encode(keypair.secretKey));
};
//# sourceMappingURL=key-pair.js.map