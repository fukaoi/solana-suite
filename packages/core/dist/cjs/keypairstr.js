"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeypairStr = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58_1 = __importDefault(require("bs58"));
class KeypairStr {
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPublicKey() {
        return new web3_js_1.PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs58_1.default.decode(this.secret);
        return web3_js_1.Keypair.fromSecretKey(decoded);
    }
}
exports.KeypairStr = KeypairStr;
KeypairStr.isPubkey = (value) => /^[0-9a-zA-Z]{32,44}$/.test(value);
KeypairStr.isSecret = (value) => /^[0-9a-zA-Z]{64}$/.test(value);
KeypairStr.create = () => {
    const keypair = web3_js_1.Keypair.generate();
    return new KeypairStr(keypair.publicKey.toBase58(), bs58_1.default.encode(keypair.secretKey));
};
//# sourceMappingURL=keypairstr.js.map