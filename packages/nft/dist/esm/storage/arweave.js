var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { toMetaplexFile, } from '@metaplex-foundation/js';
import { Result, isNode, isBrowser, debugLog } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
import { Validator } from '../validator';
export var StorageArweave;
(function (StorageArweave) {
    StorageArweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let buffer;
        if (isNode()) {
            const filepath = filePath;
            buffer = (yield import('fs')).readFileSync(filepath);
        }
        else if (isBrowser()) {
            const filepath = filePath;
            buffer = toMetaplexFile(filepath, '').buffer;
        }
        else {
            return Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        const res = yield Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
        debugLog('# buffer length, price', buffer.length, parseInt(res.basisPoints).toSol());
        return Result.ok({
            price: parseInt(res.basisPoints).toSol(),
            currency: res.currency,
        });
    });
    StorageArweave.uploadContent = (filePath, feePayer, fileOptions // only arweave, not nft-storage
    ) => __awaiter(this, void 0, void 0, function* () {
        debugLog('# upload content: ', filePath);
        let file;
        if (isNode()) {
            const filepath = filePath;
            const buffer = (yield import('fs')).readFileSync(filepath);
            if (fileOptions) {
                file = toMetaplexFile(buffer, filepath, fileOptions);
            }
            else {
                file = toMetaplexFile(buffer, filepath);
            }
        }
        else if (isBrowser()) {
            const filepath = filePath;
            if (fileOptions) {
                file = toMetaplexFile(filepath, '', fileOptions);
            }
            else {
                file = toMetaplexFile(filepath, '');
            }
        }
        else {
            return Result.err(Error('Supported environment: only Node.js and Browser js'));
        }
        return Bundlr.useStorage(feePayer)
            .upload(file)
            .then(Result.ok)
            .catch(Result.err);
    });
    StorageArweave.uploadMetadata = (metadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        debugLog('# upload meta data: ', metadata);
        const valid = Validator.checkAll(metadata);
        if (valid.isErr) {
            return valid;
        }
        return Bundlr.make(feePayer)
            .nfts()
            .uploadMetadata(metadata)
            .run()
            .then((res) => Result.ok(res.uri))
            .catch(Result.err);
    });
})(StorageArweave || (StorageArweave = {}));
