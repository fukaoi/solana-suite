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
const constants_1 = require("../../constants");
const util_1 = require("../../util");
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const form_data_1 = __importDefault(require("form-data"));
const sol_native_1 = require("../../sol-native");
const path_1 = __importDefault(require("path"));
const web3_js_1 = require("@solana/web3.js");
var StorageArweave;
(function (StorageArweave) {
    const METADATA_FILE = 'metadata.json';
    const LAMPORT_MULTIPLIER = Math.pow(10, 9);
    const WINSTON_MULTIPLIER = Math.pow(10, 12);
    const DEFAULT_RADIX = 10;
    const calculateArFee = (files) => __awaiter(this, void 0, void 0, function* () {
        const totalBytes = files.reduce((sum, f) => (sum += f.length), 0);
        console.debug('Total bytes', totalBytes);
        const txnFeeInWinstons = parseInt(yield (yield (0, cross_fetch_1.default)(`${constants_1.Constants.ARWEAVE_GATEWAY_URL}/price/0`)).text(), DEFAULT_RADIX);
        console.debug('txn fee', txnFeeInWinstons);
        const byteCostInWinstons = parseInt(yield (yield (0, cross_fetch_1.default)(`${constants_1.Constants.ARWEAVE_GATEWAY_URL}/price/` + totalBytes.toString())).text(), DEFAULT_RADIX);
        console.debug('byte cost', byteCostInWinstons);
        const totalArCost = (txnFeeInWinstons * files.length + byteCostInWinstons) / WINSTON_MULTIPLIER;
        console.debug('total ar', totalArCost);
        const conversionRates = JSON.parse(yield (yield (0, cross_fetch_1.default)(`${constants_1.Constants.COIN_MARKET_URL}?ids=solana,arweave&vs_currencies=usd`)).text());
        console.debug(JSON.stringify(conversionRates));
        // To figure out how many lamports are required, multiply ar byte cost by this number
        const arMultiplier = (conversionRates.arweave.usd / conversionRates.solana.usd) / web3_js_1.LAMPORTS_PER_SOL;
        console.debug('Ar mult', arMultiplier);
        // // We also always make a manifest file, which, though tiny, needs payment.
        return LAMPORT_MULTIPLIER * totalArCost * arMultiplier * 1.1;
    });
    const isJpegFile = (imageName) => {
        const match = imageName.match(/.+(.jpeg|.jpg)$/i);
        return util_1.Util.isEmpty(match) ? false : true;
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
        uploadData.append('env', constants_1.Constants.CURRENT_NETWORK);
        uploadData.append('file[]', imageBuffer, { filename: pngName, contentType: 'image/png' });
        uploadData.append('file[]', metadataBuffer, METADATA_FILE);
        return uploadData;
    };
    const uploadServer = (uploadData) => __awaiter(this, void 0, void 0, function* () {
        return yield (yield (0, cross_fetch_1.default)(constants_1.Constants.ARWEAVE_UPLOAD_SRV_URL, {
            method: 'POST',
            body: uploadData,
        })).json();
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
        yield sol_native_1.SolNative.transfer(payer.publicKey, [payer], constants_1.Constants.AR_SOL_HOLDER_ID, yield calculateArFee(fileBuffers))();
        // todo: No support FormData
        const res = yield uploadServer(formData);
        if (res.error)
            throw new Error(res.error);
        const manifest = res.messages.pop();
        return `${constants_1.Constants.ARWEAVE_GATEWAY_URL}/${manifest.transactionId}`;
    });
})(StorageArweave = exports.StorageArweave || (exports.StorageArweave = {}));
