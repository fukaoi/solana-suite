var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SystemProgram } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, createMintToCheckedInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { Node, MintInstruction, Try, debugLog, overwriteObject, KeypairAccount, } from '@solana-suite/shared';
import { Bundlr, Validator, Creators, } from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.createMintInstruction = (connection, mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        const metadataPda = Bundlr.make().nfts().pdas().metadata({ mint: mint });
        const tokenAssociated = yield getAssociatedTokenAddress(mint, owner);
        const inst = SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey: mint,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
        });
        const inst2 = createInitializeMintInstruction(mint, mintDecimal, owner, owner, TOKEN_PROGRAM_ID);
        const inst3 = createAssociatedTokenAccountInstruction(feePayer, tokenAssociated, owner, mint);
        const inst4 = createMintToCheckedInstruction(mint, tokenAssociated, owner, _Calculate.calculateAmount(totalAmount, mintDecimal), mintDecimal);
        const inst5 = createCreateMetadataAccountV2Instruction({
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
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer.toKeypair() : signer.toKeypair();
            input.royalty = input.royalty ? input.royalty : 0;
            const value = Creators.toInputConvert(input.creators);
            const metadata = overwriteObject(input, 'creators', {
                key: 'creators',
                value,
            });
            const uploaded = yield Storage.uploadMetaContent(metadata, feePayer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# reducedMetadata: ', reducedMetadata);
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: undefined,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            const connection = Node.getConnection();
            const mint = KeypairAccount.create();
            const insts = yield SplToken.createMintInstruction(connection, mint.toPublicKey(), owner.toPublicKey(), totalAmount, mintDecimal, tokenMetadata, payer.publicKey, isMutable);
            return new MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer, mint.pubkey);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map