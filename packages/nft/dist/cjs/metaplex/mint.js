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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const web3_js_1 = require("@solana/web3.js");
const storage_1 = require("../storage");
const shared_1 = require("@solana-suite/shared");
const validator_1 = require("../validator");
const royalty_1 = require("./royalty");
const bundlr_1 = require("../bundlr");
const js_1 = require("@metaplex-foundation/js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    const createNftBuilder = (params, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const useNewMint = web3_js_1.Keypair.generate();
        const updateAuthority = owner;
        const mintAuthority = owner;
        const tokenOwner = owner.publicKey;
        const inst = yield Metaplex.createNftBuilderInstruction(feePayer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
        return new shared_1.MintInstruction(inst, [feePayer, useNewMint, owner], undefined, useNewMint.publicKey.toString());
    });
    const initNftStorageMetadata = (input, sellerFeeBasisPoints, options) => {
        const data = {
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            seller_fee_basis_points: sellerFeeBasisPoints,
            external_url: input.external_url,
            attributes: input.attributes,
            properties: input.properties,
            image: '',
        };
        return Object.assign(Object.assign({}, data), options);
    };
    Metaplex.uploadMetaContent = (input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let storage;
        const { filePath, storageType, royalty, options } = input, reducedMetadata = __rest(input, ["filePath", "storageType", "royalty", "options"]);
        const sellerFeeBasisPoints = royalty_1.Metaplex.convertRoyalty(royalty);
        const storageData = initNftStorageMetadata(input, sellerFeeBasisPoints, options);
        if (storageType === 'arweave') {
            storage = yield (yield storage_1.StorageArweave.uploadContent(filePath, feePayer)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageData.image = ok;
                return yield storage_1.StorageArweave.uploadMetadata(storageData, feePayer);
            }), (err) => {
                throw err;
            });
        }
        else if (storageType === 'nftStorage') {
            storage = yield (yield storage_1.StorageNftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageData.image = ok;
                return yield storage_1.StorageNftStorage.uploadMetadata(storageData);
            }), (err) => {
                throw err;
            });
        }
        if (!storage) {
            throw Error('Empty storage object');
        }
        return {
            uri: storage.unwrap(),
            sellerFeeBasisPoints,
            reducedMetadata,
        };
    });
    Metaplex.createNftBuilderInstruction = (feePayer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        (0, shared_1.debugLog)('# params: ', params);
        (0, shared_1.debugLog)('# feePayer: ', feePayer === null || feePayer === void 0 ? void 0 : feePayer.publicKey.toString());
        (0, shared_1.debugLog)('# useNewMint: ', useNewMint.publicKey.toString());
        (0, shared_1.debugLog)('# updateAuthority: ', updateAuthority.publicKey.toString());
        (0, shared_1.debugLog)('# mintAuthority: ', mintAuthority.publicKey.toString());
        (0, shared_1.debugLog)('# tokenOwner: ', tokenOwner.toString());
        const metaplex = bundlr_1.Bundlr.make(feePayer);
        const payer = metaplex.identity();
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { updateAuthority,
            mintAuthority, freezeAuthority: mintAuthority.publicKey, useNewMint,
            tokenOwner, tokenAmount: (0, js_1.token)(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = metaplex.nfts().pdas().masterEdition({ mint: mintAddress });
        // const masterEditionAddress = findMasterEditionV2Pda(mintAddress);
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
                    maxSupply: params.maxSupply === undefined
                        ? 0
                        : (params.maxSupply),
                },
            }),
            signers: [payer, mintAuthority, updateAuthority],
            key: (_a = params.createMasterEditionInstructionKey) !== null && _a !== void 0 ? _a : 'createMasterEdition',
        })
            .getInstructions());
    });
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]?: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Keypair} owner          // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (input, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = validator_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : owner;
            const uploaded = yield Metaplex.uploadMetaContent(input, payer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            return yield createNftBuilder(mintInput, owner, payer);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
