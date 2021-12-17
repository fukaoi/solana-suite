import fs from 'fs';
import { Account, KeypairStr } from 'solana-suite';
import { Constants } from '@solana-suite/shared';
console.debug(`\u001b[33m === DEBUG MODE ===`);
console.debug(`\u001b[33m solana-network: ${Constants.currentNetwork}`);
export var Setup;
(function (Setup) {
    const TEMP_KEYPAIR_FILE = `.solana-${Constants.currentNetwork}-keypair`;
    Setup.generatekeyPair = async () => {
        const { source, dest } = await getSourceAndDest();
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
    const getSourceAndDest = async () => {
        if (fs.existsSync(TEMP_KEYPAIR_FILE)) {
            const obj = await loadTempFile();
            const sourceBalance = await Account.getBalance(obj.source.pubkey.toPubkey());
            if (sourceBalance.isOk && sourceBalance.value < 0.1) {
                console.warn(`[Warning]source  alance is under 0.1 amount`);
                console.warn(`Reset setupKeyPair`);
                Account.requestAirdrop(obj.source.pubkey);
            }
            return obj;
        }
        else {
            return createTempFile();
        }
    };
    const loadTempFile = async () => {
        const obj = JSON.parse(fs.readFileSync(TEMP_KEYPAIR_FILE, 'utf8'));
        return { source: obj.source, dest: obj.dest };
    };
    const createTempFile = async () => {
        const source = Account.create();
        const dest = Account.create();
        await Account.requestAirdrop(source.toPubkey());
        const data = templateKeyPair(source, dest);
        fs.writeFileSync(TEMP_KEYPAIR_FILE, JSON.stringify(data));
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
})(Setup || (Setup = {}));
