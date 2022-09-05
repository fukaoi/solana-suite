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
KeypairStr.create = () => {
    const keypair = Keypair.generate();
    return new KeypairStr(keypair.publicKey.toBase58(), bs.encode(keypair.secretKey));
};
