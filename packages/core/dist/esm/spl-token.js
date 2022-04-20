var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Token, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { Node, Result, Instruction } from '@solana-suite/shared';
export var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    const RETREY_OVER_LIMIT = 10;
    const RETREY_SLEEP_TIME = 3000;
    SplToken.retryGetOrCreateAssociatedAccountInfo = (token, owner) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETREY_OVER_LIMIT) {
            try {
                const accountInfo = yield token.getOrCreateAssociatedAccountInfo(owner);
                console.log('#associatedAccountInfo: ', accountInfo.mint.toString());
                return Result.ok(accountInfo);
            }
            catch (e) {
                console.log(`#retry: ${counter} getOrCreateAssociatedAccountInfo`, e);
            }
            setTimeout(() => console.log('#sleep end!'), RETREY_SLEEP_TIME);
            counter++;
        }
        return Result.err(Error(`retry action is over limit ${RETREY_OVER_LIMIT}`));
    });
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const tokenRes = yield Token.createMint(Node.getConnection(), feePayer, owner, owner, mintDecimal, TOKEN_PROGRAM_ID)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner);
        if (tokenAssociated.isErr) {
            return Result.err(tokenAssociated.error);
        }
        const inst = Token.createMintToInstruction(TOKEN_PROGRAM_ID, token.publicKey, tokenAssociated.value.address, owner, signers, totalAmount);
        return Result.ok(new Instruction([inst], signers, feePayer, token.publicKey.toBase58()));
    });
    SplToken.transfer = (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, feePayer);
        const sourceToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, dest);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst = Token.createTransferCheckedInstruction(TOKEN_PROGRAM_ID, sourceToken.value.address, tokenKey, destToken.value.address, owner, signers, amount, mintDecimal);
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SplToken.transferNft = (tokenKey, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(SplToken || (SplToken = {}));
