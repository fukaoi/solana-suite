"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaplexMetaData = void 0;
const web3_js_1 = require("@solana/web3.js");
const index_1 = require("./index");
const shared_1 = require("@solana-suite/shared");
const solana_suite_1 = require("solana-suite");
const spl_token_1 = require("@solana/spl-token");
var MetaplexMetaData;
(function (MetaplexMetaData) {
    const createAssociatedTokenAccountInstruction = (metaAccount, tokenKey, mintAuthorityKey, updateAuthority, payer, txnData) => {
        const keys = [
            {
                pubkey: metaAccount,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: tokenKey,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: mintAuthorityKey,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: payer,
                isSigner: true,
                isWritable: false,
            },
            {
                pubkey: updateAuthority,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: shared_1.Constants.METAPLEX_PROGRAM_ID,
            data: txnData,
        });
    };
    const updateAssociatedTokenAccountInstruction = (associatedToken, payer, source, mintKey) => {
        const keys = [
            {
                pubkey: payer,
                isSigner: true,
                isWritable: true,
            },
            {
                pubkey: associatedToken,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: source,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: mintKey,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: spl_token_1.TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new web3_js_1.TransactionInstruction({
            keys,
            programId: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
            data: Buffer.from([]),
        });
    };
    MetaplexMetaData.getByTokenKey = async (tokenKey) => {
        const metaAccount = await index_1.MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
        if (metaAccount.isErr) {
            return shared_1.Result.err(metaAccount.error);
        }
        const nfts = await shared_1.Node.getConnection().getParsedAccountInfo(metaAccount.value)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (nfts.isErr)
            return shared_1.Result.err(nfts.error);
        const accountData = nfts.value;
        const data = accountData.value?.data;
        if (data) {
            return shared_1.Result.ok(index_1.MetaplexSerialize.decode(data));
        }
        return shared_1.Result.ok(index_1.Metaplex.initFormat());
    };
    MetaplexMetaData.getByOwner = async (owner) => {
        // Get all token by owner
        const tokens = await shared_1.Node.getConnection().getParsedTokenAccountsByOwner(owner, { programId: spl_token_1.TOKEN_PROGRAM_ID })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (tokens.isErr)
            return shared_1.Result.err(tokens.error);
        const arr = tokens.value;
        const matches = [];
        // Filter only metaplex nft
        for (const token of arr.value) {
            const decoded = await MetaplexMetaData.getByTokenKey(token.account.data.parsed.info.mint.toPubkey());
            if (!decoded)
                continue;
            if (decoded.isErr) {
                return shared_1.Result.err(decoded.error);
            }
            matches.push(decoded.value);
        }
        return shared_1.Result.ok(matches);
    };
    MetaplexMetaData.create = async (data, tokenKey, mintAuthorityKey, updateAuthority, feePayer) => {
        const metaAccount = await index_1.MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
        if (metaAccount.isErr) {
            return shared_1.Result.err(metaAccount.error);
        }
        const txnData = index_1.MetaplexSerialize.serializeCreateArgs(data);
        const inst = createAssociatedTokenAccountInstruction(metaAccount.unwrap(), tokenKey, mintAuthorityKey, updateAuthority, feePayer, txnData);
        return shared_1.Result.ok([inst]);
    };
    MetaplexMetaData.update = async (data, newUpdateAuthority, primarySaleHappened, tokenKey, updateAuthority, signers) => {
        const inst = [];
        const associatedToken = await solana_suite_1.Account.findAssocaiatedTokenAddress(updateAuthority, tokenKey);
        if (associatedToken.isErr) {
            return shared_1.Result.err(associatedToken.error);
        }
        inst.push(updateAssociatedTokenAccountInstruction(associatedToken.value, updateAuthority, updateAuthority, tokenKey));
        inst.push(spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, tokenKey, associatedToken.value, updateAuthority, signers, 1));
        const metaAccount = await index_1.MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
        if (metaAccount.isErr) {
            return shared_1.Result.err(metaAccount.error);
        }
        const txnData = index_1.MetaplexSerialize.serializeUpdateArgs(data, newUpdateAuthority, primarySaleHappened);
        const keys = [
            {
                pubkey: metaAccount.value,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: updateAuthority,
                isSigner: true,
                isWritable: false,
            },
        ];
        inst.push(new web3_js_1.TransactionInstruction({
            keys,
            programId: shared_1.Constants.METAPLEX_PROGRAM_ID,
            data: txnData,
        }));
        return shared_1.Result.ok(inst);
    };
})(MetaplexMetaData = exports.MetaplexMetaData || (exports.MetaplexMetaData = {}));
