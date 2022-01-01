import { Token, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { Node, Result, Instruction } from '@solana-suite/shared';
export var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    SplToken.mint = async (owner, signers, totalAmount, mintDecimal, feePayer) => {
        !feePayer && (feePayer = signers[0]);
        const tokenRes = await Token.createMint(Node.getConnection(), feePayer, owner, owner, mintDecimal, TOKEN_PROGRAM_ID)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = await token.getOrCreateAssociatedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenAssociated.isErr) {
            return Result.err(tokenAssociated.error);
        }
        const inst = Token.createMintToInstruction(TOKEN_PROGRAM_ID, token.publicKey, tokenAssociated.value.address, owner, signers, totalAmount);
        return Result.ok(new Instruction([inst], signers, feePayer, token.publicKey.toBase58()));
    };
    SplToken.transfer = async (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => {
        !feePayer && (feePayer = signers[0]);
        const token = new Token(Node.getConnection(), tokenKey, TOKEN_PROGRAM_ID, feePayer);
        const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
            .then(Result.ok)
            .catch(Result.err);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
            .then(Result.ok)
            .catch(Result.err);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst = Token.createTransferCheckedInstruction(TOKEN_PROGRAM_ID, sourceToken.value.address, tokenKey, destToken.value.address, owner, signers, amount, mintDecimal);
        return Result.ok(new Instruction([inst], signers, feePayer));
    };
    SplToken.transferNft = async (tokenKey, owner, dest, signers, feePayer) => {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    };
})(SplToken || (SplToken = {}));
