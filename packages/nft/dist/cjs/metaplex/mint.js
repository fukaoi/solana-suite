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
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
const storage_1 = require("@solana-suite/storage");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_2 = require("@solana-suite/shared");
var Metaplex;
(function (Metaplex) {
    Metaplex.createMintInstructions = (mint, owner, nftMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        let ata = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, owner);
        let tokenMetadataPubkey = shared_metaplex_1.Pda.getMetadata(mint);
        let masterEditionPubkey = shared_metaplex_1.Pda.getMasterEdition(mint);
        const connection = shared_2.Node.getConnection();
        const inst1 = web3_js_1.SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: mint,
            lamports: yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection),
            space: spl_token_1.MINT_SIZE,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
        const inst2 = (0, spl_token_1.createInitializeMintInstruction)(mint, 0, owner, owner);
        const inst3 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(feePayer, ata, owner, mint);
        const inst4 = (0, spl_token_1.createMintToCheckedInstruction)(mint, ata, feePayer, 1, 0);
        const inst5 = (0, mpl_token_metadata_1.createCreateMetadataAccountV2Instruction)({
            metadata: tokenMetadataPubkey,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV2: {
                data: nftMetadata,
                isMutable,
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
            const overwrited = Object.assign(Object.assign({}, input), { creators,
                collection,
                properties });
            const sellerFeeBasisPoints = shared_metaplex_1.Royalty.convert(overwrited.royalty);
            const nftStorageMetadata = storage_1.Storage.toConvertNftStorageMetadata(overwrited, sellerFeeBasisPoints);
            const uploaded = yield storage_1.Storage.uploadMetaContent(nftStorageMetadata, overwrited.filePath, overwrited.storageType, payer);
            if (uploaded.isErr) {
                throw uploaded;
            }
            const uri = uploaded.value;
            const datav2 = shared_metaplex_1.MetaplexMetadata.toConvertDataV2(overwrited, uri, sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# upload content url: ', uploaded);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            const mint = shared_1.KeypairAccount.create();
            const insts = yield Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, payer.toKeypair().publicKey, input.isMutable || true);
            return new shared_1.MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=mint.js.map