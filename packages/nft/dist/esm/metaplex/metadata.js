var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Metaplex, MetaplexSerialize, MetaplexAccount, } from './index';
import { Node, Constants, Result } from '@solana-suite/shared';
import { Account } from '@solana-suite/core';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, createMintToInstruction, } from '@solana/spl-token';
export var MetaplexMetaData;
(function (MetaplexMetaData) {
    const createAssociatedTokenAccountInstruction = (metaAccount, mint, mintAuthorityKey, updateAuthority, payer, txnData) => {
        const keys = [
            {
                pubkey: metaAccount,
                isSigner: false,
                isWritable: true,
            },
            {
                pubkey: mint,
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
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new TransactionInstruction({
            keys,
            programId: Constants.METAPLEX_PROGRAM_ID,
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
                pubkey: SystemProgram.programId,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: TOKEN_PROGRAM_ID,
                isSigner: false,
                isWritable: false,
            },
            {
                pubkey: SYSVAR_RENT_PUBKEY,
                isSigner: false,
                isWritable: false,
            },
        ];
        return new TransactionInstruction({
            keys,
            programId: ASSOCIATED_TOKEN_PROGRAM_ID,
            data: Buffer.from([]),
        });
    };
    MetaplexMetaData.getByTokenKey = (mint) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaAccount = yield MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);
        if (metaAccount.isErr) {
            return Result.err(metaAccount.error);
        }
        const nfts = yield Node.getConnection().getParsedAccountInfo(metaAccount.value)
            .then(Result.ok)
            .catch(Result.err);
        if (nfts.isErr)
            return Result.err(nfts.error);
        const accountData = nfts.value;
        const data = (_a = accountData.value) === null || _a === void 0 ? void 0 : _a.data;
        if (data) {
            return Result.ok(MetaplexSerialize.decode(data));
        }
        return Result.ok(Metaplex.initFormat());
    });
    MetaplexMetaData.getByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        // Get all token by owner
        const tokens = yield Node.getConnection().getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID })
            .then(Result.ok)
            .catch(Result.err);
        if (tokens.isErr)
            return Result.err(tokens.error);
        const arr = tokens.value;
        const matches = [];
        // Filter only metaplex nft
        for (const token of arr.value) {
            const decoded = yield MetaplexMetaData.getByTokenKey(token.account.data.parsed.info.mint.toPublicKey());
            if (!decoded)
                continue;
            if (decoded.isErr) {
                return Result.err(decoded.error);
            }
            matches.push(decoded.value);
        }
        return Result.ok(matches);
    });
    MetaplexMetaData.create = (data, mint, mintAuthorityKey, updateAuthority, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const metaAccount = yield MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);
        if (metaAccount.isErr) {
            return Result.err(metaAccount.error);
        }
        const txnData = MetaplexSerialize.serializeCreateArgs(data);
        const inst = createAssociatedTokenAccountInstruction(metaAccount.unwrap(), mint, mintAuthorityKey, updateAuthority, feePayer, txnData);
        return Result.ok([inst]);
    });
    MetaplexMetaData.update = (data, newUpdateAuthority, primarySaleHappened, mint, updateAuthority, signers) => __awaiter(this, void 0, void 0, function* () {
        const inst = [];
        const associatedToken = yield Account.findAssocaiatedTokenAddress(mint, updateAuthority);
        if (associatedToken.isErr) {
            return Result.err(associatedToken.error);
        }
        inst.push(updateAssociatedTokenAccountInstruction(associatedToken.value, updateAuthority, updateAuthority, mint));
        inst.push(createMintToInstruction(mint, associatedToken.value, updateAuthority, 1, signers, TOKEN_PROGRAM_ID));
        const metaAccount = yield MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);
        if (metaAccount.isErr) {
            return Result.err(metaAccount.error);
        }
        const txnData = MetaplexSerialize.serializeUpdateArgs(data, newUpdateAuthority, primarySaleHappened);
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
        inst.push(new TransactionInstruction({
            keys,
            programId: Constants.METAPLEX_PROGRAM_ID,
            data: txnData,
        }));
        return Result.ok(inst);
    });
})(MetaplexMetaData || (MetaplexMetaData = {}));
