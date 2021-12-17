"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Setup = void 0;
const fs_1 = __importDefault(require("fs"));
const solana_suite_1 = require("solana-suite");
const shared_1 = require("@solana-suite/shared");
console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${shared_1.Constants.currentNetwork}`);
var Setup;
(function (Setup) {
    const TEMP_KEYPAIR_FILE = `.solana-${shared_1.Constants.currentNetwork}-keypair`;
    Setup.generatekeyPair = async () => {
        const { source, dest } = await getSourceAndDest();
        debug(source, dest);
        return {
            source: new solana_suite_1.KeypairStr(source.pubkey, source.secret),
            dest: new solana_suite_1.KeypairStr(dest.pubkey, dest.secret),
        };
    };
    const debug = (source, dest) => {
        console.debug(`# source.pubkey:`, source.pubkey);
        console.debug(`# source.secret: `, source.secret);
        console.debug(`# destination.pubkey:`, dest.pubkey);
        console.debug(`# destination.secret: `, dest.secret);
    };
    const getSourceAndDest = async () => {
        if (fs_1.default.existsSync(TEMP_KEYPAIR_FILE)) {
            const obj = await loadTempFile();
            const sourceBalance = await solana_suite_1.Account.getBalance(obj.source.pubkey.toPubkey());
            if (sourceBalance.isOk && sourceBalance.value < 0.1) {
                console.warn(`[Warning]source  alance is under 0.1 amount`);
                console.warn(`Reset setupKeyPair`);
                solana_suite_1.Account.requestAirdrop(obj.source.pubkey);
            }
            return obj;
        }
        else {
            return createTempFile();
        }
    };
    const loadTempFile = async () => {
        const obj = JSON.parse(fs_1.default.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
        return { source: obj.source, dest: obj.dest };
    };
    const createTempFile = async () => {
        const source = solana_suite_1.Account.create();
        const dest = solana_suite_1.Account.create();
        await solana_suite_1.Account.requestAirdrop(source.toPubkey());
        const data = templateKeyPair(source, dest);
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
