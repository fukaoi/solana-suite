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
    SplToken.createFreezeAuthority = (mint, owner, freezeAuthority) => {
        return (0, spl_token_1.createSetAuthorityInstruction)(mint, owner, spl_token_1.AuthorityType.FreezeAccount, freezeAuthority);
    };
    SplToken.createMintInstructions = (mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const connection = shared_1.Node.getConnection();
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection);
        const metadataPda = shared_metaplex_1.Pda.getMetadata(mint.toString());
        const tokenAssociated = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, owner);
        const inst1 = web3_js_1.SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey: mint,
            space: spl_token_1.MINT_SIZE,
            lamports: lamports,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        });
        const inst2 = (0, spl_token_1.createInitializeMintInstruction)(mint, mintDecimal, owner, owner, spl_token_1.TOKEN_PROGRAM_ID);
        const inst3 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(feePayer, tokenAssociated, owner, mint);
        const inst4 = (0, spl_token_1.createMintToCheckedInstruction)(mint, tokenAssociated, owner, calculate_amount_1.SplToken.calculateAmount(totalAmount, mintDecimal), mintDecimal);
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
        return [inst1, inst2, inst3, inst4, inst5];
    });
    /**
     * SPL-TOKEN mint
     *
     * @param {Pubkey} owner       // token owner
     * @param {Secret} signer      // token owner Secret
     * @param {number} totalAmount // total number
     * @param {number} mintDecimal // token decimal
     * @param {Pubkey} input       // token metadata
     * @param {Secret} feePayer?   // fee payer
     * @param {Pubkey} freezeAuthority? // freeze authority
     * @return Promise<Result<MintInstruction, Error>>
     */
    SplToken.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const valid = shared_metaplex_1.Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            input.royalty = 0;
            const sellerFeeBasisPoints = 0;
            const tokenStorageMetadata = storage_1.Storage.toConvertOffchaindata(input, input.royalty);
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield storage_1.Storage.uploadMetaAndContent(tokenStorageMetadata, input.filePath, input.storageType, payer);
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
            const isMutable = true;
            const datav2 = shared_metaplex_1.Convert.TokenMetadata.intoInfra(input, uri, sellerFeeBasisPoints);
            (0, shared_1.debugLog)('# datav2: ', datav2);
            (0, shared_1.debugLog)('# upload content url: ', uri);
            const mint = shared_1.KeypairAccount.create();
            const insts = yield SplToken.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), totalAmount, mintDecimal, datav2, payer.toKeypair().publicKey, isMutable);
            // freezeAuthority
            if (freezeAuthority) {
                insts.push(SplToken.createFreezeAuthority(mint.toPublicKey(), owner.toPublicKey(), freezeAuthority.toPublicKey()));
            }
            return new shared_1.MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=mint.js.map