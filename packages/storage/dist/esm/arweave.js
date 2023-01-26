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
import { isNode, isBrowser, debugLog, Try } from '@solana-suite/shared';
import { Bundlr } from '@solana-suite/shared-metaplex';
export var Arweave;
(function (Arweave) {
    Arweave.getUploadPrice = (filePath, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
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
                throw Error('Supported environment: only Node.js and Browser js');
            }
            const res = yield Bundlr.useStorage(feePayer).getUploadPrice(buffer.length);
            const basisPoints = res.basisPoints.toString();
            debugLog('# buffer length, price', buffer.length, parseInt(basisPoints).toSol());
            return {
                price: parseInt(basisPoints).toSol(),
                currency: res.currency,
            };
        }));
    });
    Arweave.uploadContent = (filePath, feePayer, fileOptions // only arweave, not nft-storage
    ) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
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
                throw Error('Supported environment: only Node.js and Browser js');
            }
            return Bundlr.useStorage(feePayer).upload(file);
        }));
    });
    Arweave.uploadMetadata = (metadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            debugLog('# upload meta data: ', metadata);
            const uploaded = yield Bundlr.make(feePayer)
                .nfts()
                .uploadMetadata(metadata);
            return uploaded.uri;
        }));
    });
})(Arweave || (Arweave = {}));
//# sourceMappingURL=arweave.js.map