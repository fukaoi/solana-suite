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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
const storage_1 = require("@solana-suite/storage");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_2 = require("@solana-suite/shared");
const NFT_AMOUNT = 1;
var Metaplex;
(function (Metaplex) {
    Metaplex.createDeleagateInstruction = (mint, owner, delegateAuthority) => {
        const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner);
        return (0, spl_token_1.createApproveInstruction)(tokenAccount, delegateAuthority, owner, NFT_AMOUNT);
    };
    Metaplex.createMintInstructions = (mint, owner, nftMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const ata = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner);
        const tokenMetadataPubkey = shared_metaplex_1.Pda.getMetadata(mint.toString());
        const masterEditionPubkey = shared_metaplex_1.Pda.getMasterEdition(mint.toString());
        const connection = shared_2.Node.getConnection();
        const inst1 = web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey: mint,
            lamports: yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection),
            space: spl_token_1.MINT_SIZE,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
        const inst2 = (0, spl_token_1.createInitializeMintInstruction)(mint, 0, owner, owner);
        const inst3 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(feePayer, ata, owner, mint);
        const inst4 = (0, spl_token_1.createMintToCheckedInstruction)(mint, ata, owner, 1, 0);
        const inst5 = (0, mpl_token_metadata_1.createCreateMetadataAccountV3Instruction)({
            metadata: tokenMetadataPubkey,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV3: {
                data: nftMetadata,
                isMutable,
                collectionDetails: { __kind: 'V1', size: new bn_js_1.default(1) },
            },
        });
        const inst6 = (0, mpl_token_metadata_1.createCreateMasterEditionV3Instruction)({
            edition: masterEditionPubkey,
            mint,
            updateAuthority: owner,
            mintAuthority: owner,
            payer: feePayer,
            metadata: tokenMetadataPubkey,
        }, {
            createMasterEditionArgs: {
                maxSupply: 0,
            },
        });
        return [inst1, inst2, inst3, inst4, inst5, inst6];
    });
    /**
     * Upload content and NFT mint
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
     *   creators?: InputCreators[]    // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   options?: [key: string]?: unknown       // optional param, Usually not used.
     * }
     * @param {Secret} feePayer?         // fee payer
     * @param {Pubkey} freezeAuthority?  // freeze authority
     * @return Promise<Result<MintInstruction, Error>>
     */
    Metaplex.mint = (owner, signer, input, feePayer, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            //--- porperties, Upload content ---
            let properties;
            if (input.properties && input.storageType) {
                properties = yield shared_metaplex_1.Convert.Properties.intoInfra(input.properties, storage_1.Storage.uploadContent, input.storageType, payer);
            }
            else if (input.properties && !input.storageType) {
                throw Error('Must set storageType if will use properties');
            }
            // created at by unix timestamp
            // const createdAt = Math.floor(new Date().getTime() / 1000);
            // if (input.options) {
            //   input.options = { created_at: createdAt };
            // } else {
            //   const options = { created_at: createdAt };
            //   input = { ...input, options };
            // }
            input = Object.assign(Object.assign({}, input), { properties });
            //--- porperties, Upload content ---
            const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(input.royalty);
            const nftStorageMetadata = storage_1.Storage.toConvertOffchaindata(input, sellerFeeBasisPoints);
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield storage_1.Storage.uploadMetaAndContent(nftStorageMetadata, input.filePath, input.storageType, payer);
                (0, shared_1.debugLog)('# upload content url: ', uploaded);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType + filePath' or 'uri'`);
            }
            let datav2 = shared_metaplex_1.Convert.NftMetadata.intoInfra(input, uri, sellerFeeBasisPoints);
            //--- collection ---
            let collection;
            if (input.collection && input.collection) {
                collection = shared_metaplex_1.Convert.Collection.intoInfra(input.collection);
                datav2 = Object.assign(Object.assign({}, datav2), { collection });
            }
            const isMutable = input.isMutable === undefined ? true : input.isMutable;
            (0, shared_1.debugLog)('# input: ', input);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            const mint = shared_1.KeypairAccount.create();
            const insts = yield Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, payer.toKeypair().publicKey, isMutable);
            // freezeAuthority
            if (freezeAuthority) {
                insts.push(Metaplex.createDeleagateInstruction(mint.toPublicKey(), owner.toPublicKey(), freezeAuthority.toPublicKey()));
            }
            return new shared_1.MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=mint.js.map