"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyPair = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
class KeyPair {
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
exports.KeyPair = KeyPair;
KeyPair.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeyPair.isSecret = (value) => /^[0-9a-zA-Z]{88}$/.test(value);
KeyPair.create = () => {
    const keypair = web3_js_1.Keypair.generate();
    return new KeyPair({
        pubkey: keypair.publicKey.toBase58(),
        secret: bs58_1.default.encode(keypair.secretKey),
    });
};
//# sourceMappingURL=key-pair.js.map