"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypairAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
class KeypairAccount {
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
        return new web3_js_1.PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs58_1.default.decode(this.secret);
        return web3_js_1.Keypair.fromSecretKey(decoded);
    }
}
exports.KeypairAccount = KeypairAccount;
KeypairAccount.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeypairAccount.isSecret = (value) => /^[0-9a-zA-Z]{87,88}$/.test(value);
KeypairAccount.create = () => {
    const keypair = web3_js_1.Keypair.generate();
    return new KeypairAccount({
        pubkey: keypair.publicKey.toString(),
        secret: bs58_1.default.encode(keypair.secretKey),
    });
};
KeypairAccount.toKeyPair = (keypair) => {
    return new KeypairAccount({
        pubkey: keypair.publicKey.toString(),
        secret: bs58_1.default.encode(keypair.secretKey),
    });
};
//# sourceMappingURL=keypair-account.js.map