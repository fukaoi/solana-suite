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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const web3_js_1 = require("@solana/web3.js");
const storage_1 = require("@solana-suite/storage");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const mint_1 = require("./mint");
var Metaplex;
(function (Metaplex) {
    /**
     * Upload content and NFT mint with Partial Sign
     *
     * @param {Pubkey} owner          // first minted owner
     * @param {Secret} signer         // owner's Secret
     * @param {UserSideInput.NftMetadata} input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Pubkey           // collections of different colors, shapes, etc.
     *   [key: string]?: unknown       // optional param, Usually not used.
     *   creators?: InputCreators[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     * }
     * @param {Secret} feePayer?         // fee payer
     * @param {Pubkey} freezeAuthority?  // freeze authority
     * @return Promise<Result<PartialSignInstruction, Error>>
     */
    Metaplex.feePayerPartialSignMint = (owner, signer, input, feePayer, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(input.royalty);
            //--- porperties, Upload content ---
            let uri = '';
            if (input.filePath && input.storageType === 'nftStorage') {
                const properties = yield shared_metaplex_1.Convert.Properties.intoInfra(input.properties, storage_1.Storage.uploadContent, input.storageType);
                const nftStorageMetadata = storage_1.Storage.toConvertOffchaindata(Object.assign(Object.assign({}, input), { properties }), sellerFeeBasisPoints);
                const uploaded = yield storage_1.Storage.uploadMetaAndContent(nftStorageMetadata, input.filePath, input.storageType);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
                (0, shared_1.debugLog)('# upload content url: ', uploaded);
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
            }
            //--- porperties, Upload content ---
            let datav2 = shared_metaplex_1.Convert.NftMetadata.intoInfra(input, uri, sellerFeeBasisPoints);
            //--- collection ---
            let collection;
            if (input.collection && input.collection) {
                collection = shared_metaplex_1.Convert.Collection.intoInfra(input.collection);
                datav2 = Object.assign(Object.assign({}, datav2), { collection });
            }
            //--- collection ---
            const isMutable = input.isMutable === undefined ? true : input.isMutable;
            (0, shared_1.debugLog)('# input: ', input);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            const mint = shared_1.KeypairAccount.create();
            const insts = yield mint_1.Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, feePayer.toPublicKey(), isMutable);
            // freezeAuthority
            if (freezeAuthority) {
                insts.push(mint_1.Metaplex.createDeleagateInstruction(mint.toPublicKey(), owner.toPublicKey(), freezeAuthority.toPublicKey()));
            }
            const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
            const tx = new web3_js_1.Transaction({
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
                blockhash: blockhashObj.blockhash,
                feePayer: feePayer.toPublicKey(),
            });
            insts.forEach((inst) => tx.add(inst));
            tx.recentBlockhash = blockhashObj.blockhash;
            [signer, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new shared_1.PartialSignInstruction(hex, mint.pubkey);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=fee-payer-partial-sign-mint.js.map