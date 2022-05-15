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
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    const RETREY_OVER_LIMIT = 10;
    const RETREY_SLEEP_TIME = 3000;
    SplToken.retryGetOrCreateAssociatedAccountInfo = (tokenKey, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETREY_OVER_LIMIT) {
            try {
                const accountInfo = yield (0, spl_token_1.getOrCreateAssociatedTokenAccount)(shared_1.Node.getConnection(), feePayer, tokenKey, owner);
                console.debug('# associatedAccountInfo: ', accountInfo.address.toString());
                return shared_1.Result.ok(accountInfo);
            }
            catch (e) {
                console.debug(`# retry: ${counter} getOrCreateAssociatedAccountInfo`, e);
            }
            (0, shared_1.sleep)(RETREY_SLEEP_TIME);
            counter++;
        }
        return shared_1.Result.err(Error(`retry action is over limit ${RETREY_OVER_LIMIT}`));
    });
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const connection = shared_1.Node.getConnection();
        const tokenRes = yield (0, spl_token_1.createMint)(connection, feePayer, owner, owner, mintDecimal)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (tokenRes.isErr) {
            return shared_1.Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner, feePayer);
        if (tokenAssociated.isErr) {
            return shared_1.Result.err(tokenAssociated.error);
        }
        const inst = (0, spl_token_1.createMintToCheckedInstruction)(token, tokenAssociated.value.address, owner, totalAmount, mintDecimal, signers, spl_token_1.TOKEN_PROGRAM_ID);
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer, token.toBase58()));
    });
    SplToken.transfer = (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const sourceToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(tokenKey, owner, feePayer);
        if (sourceToken.isErr) {
            return shared_1.Result.err(sourceToken.error);
        }
        const destToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(tokenKey, dest, feePayer);
        if (destToken.isErr) {
            return shared_1.Result.err(destToken.error);
        }
        const inst = (0, spl_token_1.createTransferCheckedInstruction)(sourceToken.value.address, tokenKey, destToken.value.address, owner, amount, mintDecimal, signers, spl_token_1.TOKEN_PROGRAM_ID);
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer));
    });
    SplToken.transferNft = (tokenKey, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
    SplToken.feePayerPartialSignTransfer = (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        SplToken.transfer(tokenKey, owner, dest, signers, amount, mintDecimal);
        const tx = new web3_js_1.Transaction({
            feePayer: feePayer
        }).add(web3_js_1.SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: dest,
            lamports: amount * web3_js_1.LAMPORTS_PER_SOL,
        }));
        // partially sign transaction
        const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
        tx.recentBlockhash = blockhashObj.blockhash;
        // signers.forEach(signer => {
        // tx.partialSign(signer);
        // });
        try {
            const sirializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = sirializedTx.toString('hex');
            return shared_1.Result.ok(hex);
        }
        catch (ex) {
            return shared_1.Result.err(ex);
        }
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
