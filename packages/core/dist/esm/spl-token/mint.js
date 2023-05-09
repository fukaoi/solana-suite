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
import { AuthorityType, createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToCheckedInstruction, createSetAuthorityInstruction, getAssociatedTokenAddressSync, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { createCreateMetadataAccountV3Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { debugLog, KeypairAccount, MintInstruction, Node, Try, } from '@solana-suite/shared';
import { Convert, Pda, Validator, } from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.createFreezeAuthority = (mint, owner, freezeAuthority) => {
        return createSetAuthorityInstruction(mint, owner, AuthorityType.FreezeAccount, freezeAuthority);
    };
    SplToken.createMintInstructions = (mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        const metadataPda = Pda.getMetadata(mint.toString());
        const tokenAssociated = getAssociatedTokenAddressSync(mint, owner);
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
        const inst5 = createCreateMetadataAccountV3Instruction({
            metadata: metadataPda,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV3: {
                data: tokenMetadata,
                isMutable,
                collectionDetails: null
            },
        });
        return [inst1, inst2, inst3, inst4, inst5];
    });
    /**
     * SPL-TOKEN mint
     *
     * @param {Pubkey} owner       // token owner
     * @param {Secret} signer      // token owner Secret
     * @param {number} totalAmount // total number
     * @param {number} mintDecimal // token decimal
     * @param {Pubkey} input       // token metadata
     * @param {Secret} feePayer?   // fee payer
     * @param {Pubkey} freezeAuthority? // freeze authority
     * @return Promise<Result<MintInstruction, Error>>
     */
    SplToken.mint = (owner, signer, totalAmount, mintDecimal, input, feePayer, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            input.royalty = 0;
            const sellerFeeBasisPoints = 0;
            const tokenStorageMetadata = Storage.toConvertOffchaindata(input, input.royalty);
            // created at by unix timestamp
            const createdAt = Math.floor(new Date().getTime() / 1000);
            tokenStorageMetadata.created_at = createdAt;
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield Storage.uploadMetaAndContent(tokenStorageMetadata, input.filePath, input.storageType, payer);
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
            const datav2 = Convert.TokenMetadata.intoInfraSide(input, uri, sellerFeeBasisPoints);
            debugLog('# datav2: ', datav2);
            debugLog('# upload content url: ', uri);
            const mint = KeypairAccount.create();
            const insts = yield SplToken.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), totalAmount, mintDecimal, datav2, payer.toKeypair().publicKey, isMutable);
            // freezeAuthority
            if (freezeAuthority) {
                insts.push(SplToken.createFreezeAuthority(mint.toPublicKey(), owner.toPublicKey(), freezeAuthority.toPublicKey()));
            }
            return new MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map