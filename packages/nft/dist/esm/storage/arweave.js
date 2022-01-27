var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs';
import fetch from 'cross-fetch';
import FormData from 'form-data';
import path from 'path';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Constants, ConstantsFunc, Result } from '@solana-suite/shared';
import { SolNative, } from '@solana-suite/core';
export var StorageArweave;
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
        const res = yield (yield fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/0`))
            .text()
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr)
            return Result.err(res.error);
        const price = parseInt(res.value, DEFAULT_RADIX);
        console.debug('# arweave txn fee: ', price);
        return Result.ok(price);
    });
    const fetchArweaveContentsCost = (cost) => __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield fetch(`${Constants.ARWEAVE_GATEWAY_URL}/price/${cost.toString()}`))
            .text()
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr)
            return Result.err(res.error);
        const price = parseInt(res.value, DEFAULT_RADIX);
        console.debug('# arweave contents cost: ', price);
        return Result.ok(price);
    });
    const fetchConvesionRateSolAndAr = () => __awaiter(this, void 0, void 0, function* () {
        const res = yield (yield fetch(`${Constants.COIN_MARKET_URL}?ids=solana,arweave&vs_currencies=usd`))
            .text()
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr)
            return Result.err(res.error);
        console.debug('# conversion rate: ', JSON.stringify(res.value));
        return Result.ok(JSON.parse(res.value));
    });
    const calculateArweave = (files) => __awaiter(this, void 0, void 0, function* () {
        const t = totalBytes(files);
        const feePrice = yield fetchArweaveFeePrice();
        if (feePrice.isErr)
            return Result.err(feePrice.error);
        const contentsPrice = yield fetchArweaveContentsCost(t);
        if (contentsPrice.isErr)
            return Result.err(contentsPrice.error);
        const totalArCost = (feePrice.value * files.length + contentsPrice.value) / WINSTON_MULTIPLIER;
        console.debug('# total arweave cost: ', totalArCost);
        // MEMO: To figure out how many lamports are required, multiply ar byte cost by this number
        const rates = yield fetchConvesionRateSolAndAr();
        if (rates.isErr)
            return Result.err(rates.error);
        const multiplier = (rates.value.arweave.usd / rates.value.solana.usd) / LAMPORTS_PER_SOL;
        console.debug('# arweave multiplier: ', multiplier);
        // MEMO: We also always make a manifest file, which, though tiny, needs payment.
        return Result.ok(LAMPORT_MULTIPLIER * totalArCost * multiplier * 1.1);
    });
    const isJpegFile = (imageName) => {
        const match = imageName.match(/.+(.jpeg|.jpg)$/i);
        return match !== null;
    };
    const createMetadata = (storageData) => {
        let image = path.basename(storageData.image);
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
        const uploadData = new FormData();
        uploadData.append('transaction', payedSignature);
        uploadData.append('env', ConstantsFunc.switchApi(Constants.currentNetwork));
        uploadData.append('file[]', imageBuffer, { filename: pngName, contentType: 'image/png' });
        uploadData.append('file[]', metadataBuffer, METADATA_FILE);
        return uploadData;
    };
    const uploadServer = (uploadData) => __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(Constants.ARWEAVE_UPLOAD_SRV_URL, {
            method: 'POST',
            body: uploadData,
        })
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr)
            return res.error;
        const json = yield res.value.json()
            .then(Result.ok)
            .catch(Result.err);
        if (json.isErr)
            return json;
        return Result.ok(json.value);
    });
    StorageArweave.upload = (payer, storageData) => __awaiter(this, void 0, void 0, function* () {
        const imagePath = storageData.image;
        const meta = createMetadata(storageData);
        const fileBuffers = [];
        const imageBuffer = fs.readFileSync(imagePath);
        const metadataBuffer = meta.buffer;
        fileBuffers.push(imageBuffer);
        fileBuffers.push(metadataBuffer);
        const formData = createUploadData(payer.publicKey.toBase58(), meta.pngName, imageBuffer, metadataBuffer);
        const totalConst = yield calculateArweave(fileBuffers);
        if (totalConst.isErr)
            return Result.err(totalConst.error);
        const inst = yield SolNative.transfer(payer.publicKey, Constants.AR_SOL_HOLDER_ID, [payer], totalConst.value);
        if (inst.isErr) {
            return Result.err(inst.error);
        }
        else {
            const sig = yield inst.submit();
            if (sig.isErr) {
                return Result.err(sig.error);
            }
        }
        // todo: No support FormData
        const res = yield uploadServer(formData)
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr)
            return res.error;
        const manifest = res.value.unwrap().messages[0];
        if (!manifest)
            return Result.err(Error('Invalid manifest data'));
        return Result.ok(`${Constants.ARWEAVE_GATEWAY_URL}/${manifest.transactionId}`);
    });
})(StorageArweave || (StorageArweave = {}));
