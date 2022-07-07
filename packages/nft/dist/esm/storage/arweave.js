var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Metaplex, keypairIdentity, bundlrStorage, useMetaplexFile } from "@metaplex-foundation/js";
import fs from 'fs';
import { Node, Result, Constants, ConstantsFunc, } from '@solana-suite/shared';
export var StorageArweave;
(function (StorageArweave) {
    const BUNDLR_CONNECT_TIMEOUT = 60000;
    StorageArweave.uploadContent = (payer, filePath, fileOptions) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = Metaplex
            .make(Node.getConnection())
            .use(keypairIdentity(payer))
            .use(bundlrStorage({
            address: Constants.BUNDLR_NETWORK_URL,
            providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        const driver = metaplex.storage().driver();
        const buffer = fs.readFileSync(filePath);
        let file;
        if (fileOptions) {
            file = useMetaplexFile(buffer, filePath, fileOptions);
        }
        else {
            file = useMetaplexFile(buffer, filePath);
        }
        return driver.upload(file)
            .then(Result.ok)
            .catch(Result.err);
    });
    StorageArweave.uploadMetadata = (payer, input) => __awaiter(this, void 0, void 0, function* () {
        const metaplex = Metaplex
            .make(Node.getConnection())
            .use(keypairIdentity(payer))
            .use(bundlrStorage({
            address: Constants.BUNDLR_NETWORK_URL,
            providerUrl: ConstantsFunc.switchCluster(Constants.currentCluster),
            timeout: BUNDLR_CONNECT_TIMEOUT,
        }));
        return metaplex.nfts().uploadMetadata(input)
            .then(res => Result.ok(res.uri))
            .catch(Result.err);
    });
})(StorageArweave || (StorageArweave = {}));
