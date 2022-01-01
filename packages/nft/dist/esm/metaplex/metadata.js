import { TransactionInstruction, SystemProgram, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import { Metaplex, MetaplexSerialize, MetaplexAccount, } from './index';
import { Node, Constants, Result } from '@solana-suite/shared';
import { Account } from '@solana-suite/core';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token, } from '@solana/spl-token';
export var MetaplexMetaData;
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
    MetaplexMetaData.getByTokenKey = async (tokenKey) => {
        const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
        if (metaAccount.isErr) {
            return Result.err(metaAccount.error);
        }
        const nfts = await Node.getConnection().getParsedAccountInfo(metaAccount.value)
            .then(Result.ok)
            .catch(Result.err);
        if (nfts.isErr)
            return Result.err(nfts.error);
        const accountData = nfts.value;
        const data = accountData.value?.data;
        if (data) {
            return Result.ok(MetaplexSerialize.decode(data));
        }
        return Result.ok(Metaplex.initFormat());
    };
    MetaplexMetaData.getByOwner = async (owner) => {
        // Get all token by owner
        const tokens = await Node.getConnection().getParsedTokenAccountsByOwner(owner, { programId: TOKEN_PROGRAM_ID })
            .then(Result.ok)
            .catch(Result.err);
        if (tokens.isErr)
            return Result.err(tokens.error);
        const arr = tokens.value;
        const matches = [];
        // Filter only metaplex nft
        for (const token of arr.value) {
            const decoded = await MetaplexMetaData.getByTokenKey(token.account.data.parsed.info.mint.toPublicKey());
            if (!decoded)
                continue;
            if (decoded.isErr) {
                return Result.err(decoded.error);
            }
            matches.push(decoded.value);
        }
        return Result.ok(matches);
    };
    MetaplexMetaData.create = async (data, tokenKey, mintAuthorityKey, updateAuthority, feePayer) => {
        const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
        if (metaAccount.isErr) {
            return Result.err(metaAccount.error);
        }
        const txnData = MetaplexSerialize.serializeCreateArgs(data);
        const inst = createAssociatedTokenAccountInstruction(metaAccount.unwrap(), tokenKey, mintAuthorityKey, updateAuthority, feePayer, txnData);
        return Result.ok([inst]);
    };
    MetaplexMetaData.update = async (data, newUpdateAuthority, primarySaleHappened, tokenKey, updateAuthority, signers) => {
        const inst = [];
        const associatedToken = await Account.findAssocaiatedTokenAddress(tokenKey, updateAuthority);
        if (associatedToken.isErr) {
            return Result.err(associatedToken.error);
        }
        inst.push(updateAssociatedTokenAccountInstruction(associatedToken.value, updateAuthority, updateAuthority, tokenKey));
        inst.push(Token.createMintToInstruction(TOKEN_PROGRAM_ID, tokenKey, associatedToken.value, updateAuthority, signers, 1));
        const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(tokenKey);
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
    };
})(MetaplexMetaData || (MetaplexMetaData = {}));
