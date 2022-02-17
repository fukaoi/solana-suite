"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageArweave = void 0;
const fs_1 = __importDefault(require("fs"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const path_1 = __importDefault(require("path"));
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const core_1 = require("@solana-suite/core");
var StorageArweave;
(function (StorageArweave) {
    const METADATA_FILE = 'metadata.json';
    const LAMPORT_MULTIPLIER = Math.pow(10, 9);
    const WINSTON_MULTIPLIER = Math.pow(10, 12);
    const DEFAULT_RADIX = 10;
    const totalBytes = (files) => {
        const bytes = files.reduce((sum, f) => (sum += f.length), 0);
        console.debug('# total bytes: ', bytes);
        return bytes;
    };
    const fetchArweaveFeePrice = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield (0, cross_fetch_1.default)(`${shared_1.Constants.ARWEAVE_GATEWAY_URL}/price/0`))
            .text()
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr)
            return shared_1.Result.err(res.error);
        const price = parseInt(res.value, DEFAULT_RADIX);
        console.debug('# arweave txn fee: ', price);
        return shared_1.Result.ok(price);
    });
    const fetchArweaveContentsCost = (cost) => __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield (0, cross_fetch_1.default)(`${shared_1.Constants.ARWEAVE_GATEWAY_URL}/price/${cost.toString()}`))
            .text()
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr)
            return shared_1.Result.err(res.error);
        const price = parseInt(res.value, DEFAULT_RADIX);
        console.debug('# arweave contents cost: ', price);
        return shared_1.Result.ok(price);
    });
    const fetchConvesionRateSolAndAr = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield (0, cross_fetch_1.default)(`${shared_1.Constants.COIN_MARKET_URL}?ids=solana,arweave&vs_currencies=usd`))
            .text()
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr)
            return shared_1.Result.err(res.error);
        console.debug('# conversion rate: ', JSON.stringify(res.value));
        return shared_1.Result.ok(JSON.parse(res.value));
    });
    const calculateArweave = (files) => __awaiter(this, void 0, void 0, function* () {
        const t = totalBytes(files);
        const feePrice = yield fetchArweaveFeePrice();
        if (feePrice.isErr)
            return shared_1.Result.err(feePrice.error);
        const contentsPrice = yield fetchArweaveContentsCost(t);
        if (contentsPrice.isErr)
            return shared_1.Result.err(contentsPrice.error);
        const totalArCost = (feePrice.value * files.length + contentsPrice.value) / WINSTON_MULTIPLIER;
        console.debug('# total arweave cost: ', totalArCost);
        // MEMO: To figure out how many lamports are required, multiply ar byte cost by this number
        const rates = yield fetchConvesionRateSolAndAr();
        if (rates.isErr)
            return shared_1.Result.err(rates.error);
        const multiplier = (rates.value.arweave.usd / rates.value.solana.usd) / web3_js_1.LAMPORTS_PER_SOL;
        console.debug('# arweave multiplier: ', multiplier);
        // MEMO: We also always make a manifest file, which, though tiny, needs payment.
        return shared_1.Result.ok(LAMPORT_MULTIPLIER * totalArCost * multiplier * 1.1);
    });
    const isJpegFile = (imageName) => {
        const match = imageName.match(/.+(.jpeg|.jpg)$/i);
        return match !== null;
    };
    const createMetadata = (storageData) => {
        let image = path_1.default.basename(storageData.image);
        if (isJpegFile(image)) {
            const split = image.split('.jpeg');
            image = `${split[0]}.png`;
        }
        // update image name
        storageData.image = image;
        return {
            buffer: Buffer.from(JSON.stringify(storageData)),
            pngName: image
        };
    };
    const createUploadData = (payedSignature, pngName, imageBuffer, metadataBuffer) => {
        const uploadData = new form_data_1.default();
        uploadData.append('transaction', payedSignature);
        uploadData.append('env', shared_1.ConstantsFunc.switchApi(shared_1.Constants.currentCluster));
        uploadData.append('file[]', imageBuffer, { filename: pngName, contentType: 'image/png' });
        uploadData.append('file[]', metadataBuffer, METADATA_FILE);
        return uploadData;
    };
    const uploadServer = (uploadData) => __awaiter(this, void 0, void 0, function* () {
        const res = yield (0, cross_fetch_1.default)(shared_1.Constants.ARWEAVE_UPLOAD_SRV_URL, {
            method: 'POST',
            body: uploadData,
        })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr)
            return res.error;
        const json = yield res.value.json()
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (json.isErr)
            return json;
        return shared_1.Result.ok(json.value);
    });
    StorageArweave.upload = (payer, storageData) => __awaiter(this, void 0, void 0, function* () {
        const imagePath = storageData.image;
        const meta = createMetadata(storageData);
        const fileBuffers = [];
        const imageBuffer = fs_1.default.readFileSync(imagePath);
        const metadataBuffer = meta.buffer;
        fileBuffers.push(imageBuffer);
        fileBuffers.push(metadataBuffer);
        const formData = createUploadData(payer.publicKey.toBase58(), meta.pngName, imageBuffer, metadataBuffer);
        const totalConst = yield calculateArweave(fileBuffers);
        if (totalConst.isErr)
            return shared_1.Result.err(totalConst.error);
        const inst = yield core_1.SolNative.transfer(payer.publicKey, shared_1.Constants.AR_SOL_HOLDER_ID, [payer], totalConst.value);
        if (inst.isErr) {
            return shared_1.Result.err(inst.error);
        }
        else {
            const sig = yield inst.submit();
            if (sig.isErr) {
                return shared_1.Result.err(sig.error);
            }
        }
        // todo: No support FormData
        const res = yield uploadServer(formData)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr)
            return res.error;
        const manifest = res.value.unwrap().messages[0];
        if (!manifest)
            return shared_1.Result.err(Error('Invalid manifest data'));
        return shared_1.Result.ok(`${shared_1.Constants.ARWEAVE_GATEWAY_URL}/${manifest.transactionId}`);
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
