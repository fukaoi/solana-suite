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
exports.SplToken = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const calculate_amount_1 = require("./calculate-amount");
const storage_1 = require("@solana-suite/storage");
var SplToken;
(function (SplToken) {
    SplToken.createMintInstruction = (connection, mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable, signers) => __awaiter(this, void 0, void 0, function* () {
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection);
        const metadataPda = shared_metaplex_1.Bundlr.make().nfts().pdas().metadata({ mint: mint });
        const tokenAssociated = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, owner);
        const inst = web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey: mint,
            space: spl_token_1.MINT_SIZE,
            lamports: lamports,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
        const inst2 = (0, spl_token_1.createInitializeMintInstruction)(mint, mintDecimal, owner, owner, spl_token_1.TOKEN_PROGRAM_ID);
        const inst3 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(feePayer, tokenAssociated, owner, mint);
        const inst4 = (0, spl_token_1.createMintToCheckedInstruction)(mint, tokenAssociated, owner, calculate_amount_1.SplToken.calculateAmount(totalAmount, mintDecimal), mintDecimal, signers);
        // tokenMetadata.creators = 
        const inst5 = (0, mpl_token_metadata_1.createCreateMetadataAccountV2Instruction)({
            metadata: metadataPda,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV2: {
                data: tokenMetadata,
                isMutable,
            },
        });
        return [inst, inst2, inst3, inst4, inst5];
    });
    SplToken.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer.toKeypair() : signer.toKeypair();
            const uploaded = yield storage_1.Storage.uploadMetaContent(input, feePayer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            (0, shared_1.debugLog)('# upload content url: ', uri);
            (0, shared_1.debugLog)('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# reducedMetadata: ', reducedMetadata);
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: reducedMetadata.collection,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            const connection = shared_1.Node.getConnection();
            const mint = web3_js_1.Keypair.generate();
            const insts = yield SplToken.createMintInstruction(connection, mint.publicKey, owner.toPublicKey(), totalAmount, mintDecimal, tokenMetadata, payer.publicKey, isMutable);
            return new shared_1.MintInstruction(insts, [signer.toKeypair(), mint], payer, mint.publicKey.toString());
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=mint.js.map