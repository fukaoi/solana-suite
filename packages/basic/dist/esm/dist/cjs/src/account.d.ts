export var __esModule: boolean;
export var Account: {};
export class KeypairStr {
    constructor(pubkey: any, secret: any);
    pubkey: any;
    secret: any;
    toPubkey(): web3_js_1.PublicKey;
    toKeypair(): web3_js_1.Keypair;
}
import web3_js_1 = require("@solana/web3.js");
