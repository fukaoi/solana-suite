var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
export * from './internal/_mint';
export * from './royalty';
import { StorageNftStorage } from '../storage';
import { Result } from '@solana-suite/shared';
import { StorageArweave } from '../storage';
import { MetaplexInternal_Mint } from './internal/_mint';
import { Validator } from '../validator';
export var Metaplex;
(function (Metaplex) {
    /**
     * Upload content and NFT mint
     *
     * @param {NftStorageMetaplexMetadata}  metadata
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (metadata, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const valid = Validator.checkAll(metadata);
        if (valid.isErr) {
            return Result.err(valid.error);
        }
        let storageRes;
        const { filePath, storageType, royalty } = metadata, reducedMetadata = __rest(metadata, ["filePath", "storageType", "royalty"]);
        if (storageType === 'arweave') {
            storageRes = (yield StorageArweave.uploadContent(filePath, feePayer)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                reducedMetadata.image = ok;
                return yield StorageArweave.uploadMetadata(reducedMetadata, feePayer);
            }), (err) => err);
        }
        else if (storageType === 'nftStorage') {
            storageRes = (yield StorageNftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                reducedMetadata.image = ok;
                return yield StorageNftStorage.uploadMetadata(reducedMetadata);
            }), (err) => Result.err(err));
        }
        else {
            return Result.err(Error('storageType is `arweave` or `nftStorage`'));
        }
        if ((yield storageRes).isErr) {
            return storageRes;
        }
        console.log(reducedMetadata);
        const uri = (yield storageRes).unwrap();
        const mintInput = Object.assign({ uri }, reducedMetadata);
        return MetaplexInternal_Mint.create(mintInput, owner, feePayer);
    });
})(Metaplex || (Metaplex = {}));
