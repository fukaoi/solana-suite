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
import { MetaplexRoyalty } from './royalty';
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
        const data = metadata;
        if (data.royalty) {
            data.sellerFeeBasisPoints = MetaplexRoyalty.convertValue(data.royalty);
            // copied to sellerFeeBasisPoints, no need key
            delete data.royalty;
        }
        let uri;
        const { filePath, storageType } = data, reducedMetadata = __rest(data, ["filePath", "storageType"]);
        if (storageType === 'arweave') {
            reducedMetadata.image = (yield StorageArweave.uploadContent(filePath, feePayer)).unwrap();
            uri = (yield StorageArweave.uploadMetadata(reducedMetadata, feePayer)).unwrap();
        }
        else if (storageType === 'nftStorage') {
            reducedMetadata.image = (yield StorageArweave.uploadContent(filePath, feePayer)).unwrap();
            uri = (yield StorageNftStorage.uploadMetadata(reducedMetadata)).unwrap();
        }
        else {
            return Result.err(Error('storageType is `arweave` or `nftStorage`'));
        }
        const mintInput = Object.assign({ uri }, reducedMetadata);
        return MetaplexInternal_Mint.create(mintInput, owner, feePayer);
    });
})(Metaplex || (Metaplex = {}));
