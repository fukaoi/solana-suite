import { Keypair, PublicKey } from '@solana/web3.js';
import bs from 'bs58';
export class KeyPair {
    constructor(params) {
        if (!params.pubkey) {
            const keypair = params.secret.toKeypair();
            this.pubkey = keypair.publicKey.toString();
        }
        else {
            this.pubkey = params.pubkey;
        }
        this.secret = params.secret;
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
    return new KeyPair({
        pubkey: keypair.publicKey.toBase58(),
        secret: bs.encode(keypair.secretKey),
    });
};
//# sourceMappingURL=key-pair.js.map