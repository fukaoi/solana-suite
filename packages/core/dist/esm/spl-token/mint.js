var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair, SystemProgram } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, createMintToCheckedInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { Node, MintInstruction, Try, debugLog, } from '@solana-suite/shared';
import { Bundlr, Validator, } from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.createMintInstruction = (connection, owner, signers, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        const mint = Keypair.generate();
        const metadataPda = Bundlr.make()
            .nfts()
            .pdas()
            .metadata({ mint: mint.publicKey });
        const tokenAssociated = yield getAssociatedTokenAddress(mint.publicKey, owner);
        const inst = SystemProgram.createAccount({
            fromPubkey: feePayer.publicKey,
            newAccountPubkey: mint.publicKey,
            space: MINT_SIZE,
            lamports: lamports,
            programId: TOKEN_PROGRAM_ID,
        });
        const inst2 = createInitializeMintInstruction(mint.publicKey, mintDecimal, owner, owner, TOKEN_PROGRAM_ID);
        const inst3 = createAssociatedTokenAccountInstruction(feePayer.publicKey, tokenAssociated, owner, mint.publicKey);
        const inst4 = createMintToCheckedInstruction(mint.publicKey, tokenAssociated, owner, _Calculate.calculateAmount(totalAmount, mintDecimal), mintDecimal, signers);
        const inst5 = createCreateMetadataAccountV2Instruction({
            metadata: metadataPda,
            mint: mint.publicKey,
            mintAuthority: owner,
            payer: feePayer.publicKey,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV2: {
                data: tokenMetadata,
                isMutable,
            },
        });
        signers.push(mint);
        return new MintInstruction([inst, inst2, inst3, inst4, inst5], signers, feePayer, mint.publicKey.toString());
    });
    SplToken.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            !feePayer && (feePayer = signer);
            const uploaded = yield Storage.uploadMetaContent(input, feePayer);
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
                collection: reducedMetadata.collection,
                uses: reducedMetadata.uses,
            };
            const isMutable = !reducedMetadata.isMutable ? false : true;
            const connection = Node.getConnection();
            return yield SplToken.createMintInstruction(connection, owner, [signer], totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map