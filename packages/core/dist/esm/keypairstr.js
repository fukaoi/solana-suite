import { Keypair, PublicKey } from '@solana/web3.js';
import bs from 'bs58';
export class KeypairStr {
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
KeypairStr.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeypairStr.isSecret = (value) => /^[0-9a-zA-Z]{64}$/.test(value);
KeypairStr.create = () => {
    const keypair = Keypair.generate();
    return new KeypairStr(keypair.publicKey.toBase58(), bs.encode(keypair.secretKey));
};
//# sourceMappingURL=keypairstr.js.map