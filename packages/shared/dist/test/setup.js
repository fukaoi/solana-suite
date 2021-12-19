"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = exports.KeypairStr = void 0;
const fs_1 = __importDefault(require("fs"));
const bs58_1 = __importDefault(require("bs58"));
const src_1 = require("../src");
const web3_js_1 = require("@solana/web3.js");
console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${src_1.Constants.currentNetwork}`);
class KeypairStr {
    pubkey;
    secret;
    constructor(pubkey, secret) {
        this.pubkey = pubkey;
        this.secret = secret;
    }
    toPubkey() {
        return new web3_js_1.PublicKey(this.pubkey);
    }
    toKeypair() {
        const decoded = bs58_1.default.decode(this.secret);
        return web3_js_1.Keypair.fromSecretKey(decoded);
    }
}
exports.KeypairStr = KeypairStr;
var Setup;
(function (Setup) {
    const TEMP_KEYPAIR_FILE = `../../../solana-${src_1.Constants.currentNetwork}-keypair`;
    Setup.generatekeyPair = async () => {
        const { source, dest } = await fetechSourceAndDest();
        debug(source, dest);
        return {
            source: new KeypairStr(source.pubkey, source.secret),
            dest: new KeypairStr(dest.pubkey, dest.secret),
        };
    };
    const debug = (source, dest) => {
        console.debug(`# source.pubkey:`, source.pubkey);
        console.debug(`# source.secret: `, source.secret);
        console.debug(`# destination.pubkey:`, dest.pubkey);
        console.debug(`# destination.secret: `, dest.secret);
    };
    const fetechSourceAndDest = async () => {
        if (fs_1.default.existsSync(TEMP_KEYPAIR_FILE)) {
            return await loadTempFile();
        }
        else {
            return createTempFile();
        }
    };
    const loadTempFile = async () => {
        const obj = JSON.parse(fs_1.default.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
        return { source: obj.source, dest: obj.dest };
    };
    const requestAirdrop = async (pubkey) => {
        console.debug('Now airdropping...please wait');
        await src_1.Node.getConnection().requestAirdrop(pubkey, 10);
        const sleep = (waitSec) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, waitSec);
            });
        };
        await sleep(5);
    };
    const createTempFile = async () => {
        const source = web3_js_1.Keypair.generate();
        const dest = web3_js_1.Keypair.generate();
        await requestAirdrop(source.publicKey);
        const sourceObject = new KeypairStr(source.publicKey.toBase58(), bs58_1.default.encode(source.secretKey));
        const destObject = new KeypairStr(dest.publicKey.toBase58(), bs58_1.default.encode(dest.secretKey));
        const data = templateKeyPair(sourceObject, destObject);
        fs_1.default.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
        return { source, dest };
    };
    const templateKeyPair = (source, dest) => {
        return {
            source: {
                pubkey: source.pubkey,
                secret: source.secret,
            },
            dest: {
                pubkey: dest.pubkey,
                secret: dest.secret,
            },
        };
    };
})(Setup = exports.Setup || (exports.Setup = {}));
