var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SystemProgram, } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, createMintToCheckedInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { Node, MintInstruction, Try, debugLog, KeypairAccount, } from '@solana-suite/shared';
import { TokenMetadata, Validator, } from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage, Bundlr } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.createMintInstructions = (mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        //todo: replaced getMetadataPda()
        const metadataPda = Bundlr.make().nfts().pdas().metadata({ mint: mint });
        const tokenAssociated = yield getAssociatedTokenAddress(mint, owner);
        const inst1 = SystemProgram.createAccount({
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
        return [inst1, inst2, inst3, inst4, inst5];
    });
    SplToken.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            input.royalty = 0;
            const sellerFeeBasisPoints = 0;
            const tokenStorageMetadata = Storage.toConvertNftStorageMetadata(input, input.royalty);
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield Storage.uploadMetaContent(tokenStorageMetadata, input.filePath, input.storageType, payer);
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
            const datav2 = TokenMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            debugLog('# datav2: ', datav2);
            debugLog('# upload content url: ', uri);
            const mint = KeypairAccount.create();
            const insts = yield SplToken.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), totalAmount, mintDecimal, datav2, payer.toKeypair().publicKey, isMutable);
            return new MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map