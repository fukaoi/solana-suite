import { Keypair, PublicKey } from '@solana/web3.js';
import bs from 'bs58';
export class KeypairAccount {
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
KeypairAccount.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeypairAccount.isSecret = (value) => /^[0-9a-zA-Z]{87, 88}$/.test(value);
KeypairAccount.create = () => {
    const keypair = Keypair.generate();
    return new KeypairAccount({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey),
    });
};
KeypairAccount.toKeyPair = (keypair) => {
    return new KeypairAccount({
        pubkey: keypair.publicKey.toString(),
        secret: bs.encode(keypair.secretKey),
    });
};
//# sourceMappingURL=keypair-account.js.map