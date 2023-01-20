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
const js_1 = require("@metaplex-foundation/js");
const shared_1 = require("@solana-suite/shared");
const associated_account_1 = require("../associated-account");
var SplToken;
(function (SplToken) {
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            !feePayer && (feePayer = signers[0]);
            const connection = shared_1.Node.getConnection();
            const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection);
            const mint = web3_js_1.Keypair.generate();
            const metadataPda = yield (0, js_1.findMetadataPda)(mint.publicKey);
            const tokenAssociated = yield associated_account_1.AssociatedAccount.retryGetOrCreate(mint.publicKey, owner, feePayer);
            const tokenMetadata = {
                name: 'test',
                symbol: 'TEST',
                uri: 'https://example.com',
                sellerFeeBasisPoints: 0,
                creators: null,
                collection: null,
                uses: null,
            };
            const inst = web3_js_1.SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: mint.publicKey,
                space: spl_token_1.MINT_SIZE,
                lamports: lamports,
                programId: spl_token_1.TOKEN_PROGRAM_ID,
            });
            const inst2 = (0, spl_token_1.createInitializeMintInstruction)(mint.publicKey, mintDecimal, owner, owner, spl_token_1.TOKEN_PROGRAM_ID);
            const inst3 = (0, spl_token_1.createAssociatedTokenAccountInstruction)(owner, tokenAssociated.toPublicKey(), owner, mint.publicKey);
            const inst4 = (0, spl_token_1.createMintToInstruction)(mint.publicKey, tokenAssociated.toPublicKey(), owner, totalAmount);
            const inst5 = (0, mpl_token_metadata_1.createCreateMetadataAccountV2Instruction)({
                metadata: metadataPda,
                mint: mint.publicKey,
                mintAuthority: owner,
                payer: feePayer.publicKey,
                updateAuthority: owner,
            }, {
                createMetadataAccountArgsV2: {
                    data: tokenMetadata,
                    isMutable: true,
                },
            });
            return new shared_1.Instruction([inst, inst2, inst3, inst4, inst5], signers, feePayer, mint.publicKey.toBase58());
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=mint.js.map