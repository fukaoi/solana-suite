var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useMetaplexFile, useMetaplexFileFromBrowser } from "@metaplex-foundation/js";
import { LAMPORTS_PER_SOL, } from '@solana/web3.js';
import fs from 'fs';
import { Result, isNode, isBrowser, debugLog, } from '@solana-suite/shared';
import { Metaplex } from '../';
export var StorageArweave;
(function (StorageArweave) {
    StorageArweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const driver = Metaplex.init(feePayer).storage().driver();
        let buffer;
        if (isNode) {
            const filepath = filePath;
            buffer = fs.readFileSync(filepath);
        }
        else if (isBrowser) {
            const filepath = filePath;
            buffer = (yield useMetaplexFileFromBrowser(filepath)).buffer;
        }
        else {
            return Result.err(Error('Supported envriroment: only Node.js and Browser js'));
        }
        const res = yield driver.getUploadPrice(buffer.length);
        debugLog('# buffer length, price', buffer.length, res.basisPoints / LAMPORTS_PER_SOL);
        return Result.ok({
            price: res.basisPoints / LAMPORTS_PER_SOL,
            currency: res.currency
        });
    });
    StorageArweave.uploadContent = (filePath, feePayer, fileOptions) => __awaiter(this, void 0, void 0, function* () {
        debugLog('# upload content: ', filePath);
        const driver = Metaplex.init(feePayer).storage().driver();
        let file;
        if (isNode) {
            const filepath = filePath;
            const buffer = fs.readFileSync(filepath);
            if (fileOptions) {
                file = useMetaplexFile(buffer, filepath, fileOptions);
            }
            else {
                file = useMetaplexFile(buffer, filepath);
            }
        }
        else if (isBrowser) {
            const filepath = filePath;
            if (fileOptions) {
                file = yield useMetaplexFileFromBrowser(filepath, fileOptions);
            }
            else {
                file = yield useMetaplexFileFromBrowser(filepath);
            }
        }
        else {
            return Result.err(Error('Supported envriroment: only Node.js and Browser js'));
        }
        return driver.upload(file)
            .then(Result.ok)
            .catch(Result.err);
    });
    StorageArweave.uploadMetadata = (metadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        debugLog('# upload meta data: ', metadata);
        return Metaplex.init(feePayer).nfts().uploadMetadata(metadata)
            .then(res => Result.ok(res.uri))
            .catch(Result.err);
    });
})(StorageArweave || (StorageArweave = {}));
