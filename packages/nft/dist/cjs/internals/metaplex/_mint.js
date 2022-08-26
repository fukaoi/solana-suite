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
exports.InternalsMetaplex_Mint = void 0;
const web3_js_1 = require("@solana/web3.js");
const js_1 = require("@metaplex-foundation/js");
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("@solana/spl-token");
const validator_1 = require("../../validator");
const metaplex_1 = require("../../metaplex");
// @internal
var InternalsMetaplex_Mint;
(function (InternalsMetaplex_Mint) {
    /**
     * NFT mint
     *
     * @param {MetaplexMetaData}  metadata
     * {
     *   uri: string                   // basically storage uri
     *   name: string                  // NFT content name
     *   symbol: string                // NFT ticker symbol
     *   sellerFeeBasisPoints number   // Royalty percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // PublicKey that Owns nft
     * @param {Keypair} feePayer       // fee payer
     * @return {Promise<Result<Instruction, Error | ValidatorError>>}
     */
    InternalsMetaplex_Mint.create = (metadata, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const valid = validator_1.Validator.checkAll(metadata);
        if (valid.isErr) {
            return shared_1.Result.err(valid.error);
        }
        if (metadata.sellerFeeBasisPoints) {
            metadata.sellerFeeBasisPoints = metaplex_1.MetaplexRoyalty.convertValue(metadata.sellerFeeBasisPoints);
        }
        const operation = (0, js_1.createNftOperation)(metadata);
        const mint = web3_js_1.Keypair.generate();
        const tx = yield createNft(operation, mint, owner, feePayer);
        return shared_1.Result.ok(new shared_1.Instruction(tx, [mint], feePayer, mint.publicKey.toString()));
    });
    const resolveData = (input, metadata, updateAuthority) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const metadataCreators = (_b = (_a = metadata.properties) === null || _a === void 0 ? void 0 : _a.creators) === null || _b === void 0 ? void 0 : _b.filter((creator) => creator.address).map((creator) => {
            var _a;
            return ({
                address: new web3_js_1.PublicKey(creator.address),
                share: (_a = creator.share) !== null && _a !== void 0 ? _a : 0,
                verified: false,
            });
        });
        let creators = (_d = (_c = input.creators) !== null && _c !== void 0 ? _c : metadataCreators) !== null && _d !== void 0 ? _d : undefined;
        if (creators === undefined) {
            creators = [
                {
                    address: updateAuthority,
                    share: 100,
                    verified: true,
                },
            ];
        }
        else {
            creators = creators.map((creator) => {
                if (creator.address.toBase58() === updateAuthority.toBase58()) {
                    return Object.assign(Object.assign({}, creator), { verified: true });
                }
                else {
                    return creator;
                }
            });
        }
        return {
            name: (_f = (_e = input.name) !== null && _e !== void 0 ? _e : metadata.name) !== null && _f !== void 0 ? _f : '',
            symbol: (_h = (_g = input.symbol) !== null && _g !== void 0 ? _g : metadata.symbol) !== null && _h !== void 0 ? _h : '',
            uri: input.uri,
            sellerFeeBasisPoints: (_k = (_j = input.sellerFeeBasisPoints) !== null && _j !== void 0 ? _j : metadata.seller_fee_basis_points) !== null && _k !== void 0 ? _k : 500,
            creators,
            collection: (_l = input.collection) !== null && _l !== void 0 ? _l : null,
            uses: (_m = input.uses) !== null && _m !== void 0 ? _m : null,
        };
    };
    const createNft = (operation, mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const { 
        // uri,
        isMutable, maxSupply, payer = feePayer, mintAuthority = feePayer, updateAuthority = mintAuthority, freezeAuthority, tokenProgram = spl_token_1.TOKEN_PROGRAM_ID, associatedTokenProgram, } = operation.input;
        (0, shared_1.debugLog)('# metadata input: ', operation.input);
        (0, shared_1.debugLog)('# metadata feePayer: ', feePayer.publicKey.toString());
        (0, shared_1.debugLog)('# metadata mint: ', mint.publicKey.toString());
        (0, shared_1.debugLog)('# mintAuthority: ', mintAuthority.publicKey.toString());
        (0, shared_1.debugLog)('# updateAuthority: ', updateAuthority.publicKey.toString());
        (0, shared_1.debugLog)('# owner: ', owner.toString());
        freezeAuthority &&
            (0, shared_1.debugLog)('# freezeAuthority: ', freezeAuthority.toString());
        const metadata = {};
        // try {
        //   metadata = await Bundlr.make(feePayer).storage().downloadJson(uri);
        // } catch (e) {
        //   debugLog('# Error in createNft:', e);
        //   metadata = {};
        // }
        const data = resolveData(operation.input, metadata, updateAuthority.publicKey);
        (0, shared_1.debugLog)('# resolveData: ', data);
        const metadataPda = (0, js_1.findMetadataPda)(mint.publicKey);
        const masterEditionPda = (0, js_1.findMasterEditionV2Pda)(mint.publicKey);
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(shared_1.Node.getConnection());
        const associatedToken = (0, js_1.findAssociatedTokenAccountPda)(mint.publicKey, owner, tokenProgram, associatedTokenProgram);
        return (0, js_1.createNftBuilder)({
            lamports,
            data,
            isMutable,
            maxSupply,
            mint,
            payer,
            mintAuthority,
            updateAuthority,
            owner,
            associatedToken,
            freezeAuthority,
            metadata: metadataPda,
            masterEdition: masterEditionPda,
            tokenProgram,
            associatedTokenProgram,
        }).getInstructions();
    });
})(InternalsMetaplex_Mint = exports.InternalsMetaplex_Mint || (exports.InternalsMetaplex_Mint = {}));
