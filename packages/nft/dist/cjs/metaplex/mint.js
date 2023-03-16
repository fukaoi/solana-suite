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
const storage_1 = require("@solana-suite/storage");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const js_1 = require("@metaplex-foundation/js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    const createNftBuilder = (params, owner, signer, feePayer) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const mint = shared_1.KeypairAccount.create();
        const updateAuthority = signer;
        const mintAuthority = signer;
        const inst = yield Metaplex.createNftBuilderInstruction(feePayer.toKeypair(), params, mint.toKeypair(), updateAuthority.toKeypair(), mintAuthority.toKeypair(), owner);
        let creatorSigners = [feePayer.toKeypair()];
        if (params.creators) {
            creatorSigners = (_a = params.creators) === null || _a === void 0 ? void 0 : _a.filter((creator) => creator.authority).map((creator) => creator.authority);
        }
        return new shared_1.MintInstruction(inst, [
            feePayer.toKeypair(),
            mint.toKeypair(),
            signer.toKeypair(),
            ...creatorSigners,
        ], undefined, mint.pubkey);
    });
    Metaplex.createNftBuilderInstruction = (feePayer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        (0, shared_1.debugLog)('# params: ', params);
        (0, shared_1.debugLog)('# feePayer: ', feePayer);
        (0, shared_1.debugLog)('# useNewMint: ', useNewMint);
        (0, shared_1.debugLog)('# updateAuthority: ', updateAuthority);
        (0, shared_1.debugLog)('# mintAuthority: ', mintAuthority);
        (0, shared_1.debugLog)('# tokenOwner: ', tokenOwner);
        const metaplex = storage_1.Bundlr.make(feePayer);
        const payer = metaplex.identity();
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { updateAuthority,
            mintAuthority,
            useNewMint, tokenOwner: tokenOwner.toPublicKey(), tokenAmount: (0, js_1.token)(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = metaplex
            .nfts()
            .pdas()
            .masterEdition({ mint: mintAddress });
        return (js_1.TransactionBuilder.make()
            .setFeePayer(payer)
            .setContext({
            mintAddress,
            metadataAddress,
            masterEditionAddress,
            tokenAddress: tokenAddress,
        })
            // Create the mint, the token and the metadata.
            .add(sftBuilder)
            // Create master edition account (prevents further minting).
            .add({
            instruction: (0, mpl_token_metadata_1.createCreateMasterEditionV3Instruction)({
                edition: masterEditionAddress,
                mint: mintAddress,
                updateAuthority: updateAuthority.publicKey,
                mintAuthority: mintAuthority.publicKey,
                payer: payer.publicKey,
                metadata: metadataAddress,
            }, {
                createMasterEditionArgs: {
                    maxSupply: params.maxSupply === undefined ? 0 : params.maxSupply,
                },
            }),
            signers: [payer, mintAuthority, updateAuthority],
            key: (_b = params.createMasterEditionInstructionKey) !== null && _b !== void 0 ? _b : 'createMasterEdition',
        })
            .getInstructions());
    });
    /**
     * Upload content and NFT mint
     *
     * @param {Pubkey} owner          // first minted owner
     * @param {Secret} signer         // owner's Secret
     * @param {NftMetadata}  input
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
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Secret} feePayer?       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (owner, signer, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            //Convert creators
            const creators = shared_metaplex_1.Creators.toInputConvert(input.creators);
            (0, shared_1.debugLog)('# creators: ', creators);
            //Convert collection
            const collection = shared_metaplex_1.Collections.toInputConvert(input.collection);
            (0, shared_1.debugLog)('# collection: ', collection);
            //Convert porperties, Upload content
            const properties = yield shared_metaplex_1.Properties.toInputConvert(input.properties, storage_1.Storage.uploadContent, input.storageType, feePayer);
            (0, shared_1.debugLog)('# properties: ', properties);
            // const overwrited = overwriteObject(input, [
            //   {
            //     existsKey: 'creators',
            //     will: {
            //       key: 'creators',
            //       value: creators,
            //     },
            //   },
            //   {
            //     existsKey: 'collection',
            //     will: {
            //       key: 'collection',
            //       value: collection,
            //     },
            //   },
            //   {
            //     existsKey: 'properties',
            //     will: {
            //       key: 'properties',
            //       value: properties,
            //     },
            //   },
            // ]) as _InputNftMetadata;
            const overwrited = Object.assign(Object.assign({}, input), { creators,
                collection,
                properties });
            const uploaded = yield storage_1.Storage.uploadMetaContent(overwrited, payer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            return yield createNftBuilder(mintInput, owner, signer, payer);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=mint.js.map