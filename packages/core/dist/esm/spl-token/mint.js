var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair, SystemProgram, } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, createMintToInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { Node, Instruction, Try } from '@solana-suite/shared';
import { Bundlr, Validator, } from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            !feePayer && (feePayer = signers[0]);
            const uploaded = yield Storage.uploadMetaContent(input, feePayer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            const tokenMetadata = {
                name: reducedMetadata.name,
                symbol: reducedMetadata.symbol,
                uri,
                sellerFeeBasisPoints,
                creators: reducedMetadata.creators,
                collection: reducedMetadata.collection,
                uses: reducedMetadata.uses,
            };
            const connection = Node.getConnection();
            const lamports = yield getMinimumBalanceForRentExemptMint(connection);
            const mint = Keypair.generate();
            signers.push(mint);
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
            const inst4 = createMintToInstruction(mint.publicKey, tokenAssociated, owner, _Calculate.calculateAmount(totalAmount, mintDecimal), signers);
            const inst5 = createCreateMetadataAccountV2Instruction({
                metadata: metadataPda,
                mint: mint.publicKey,
                mintAuthority: owner,
                payer: feePayer.publicKey,
                updateAuthority: owner,
            }, {
                createMetadataAccountArgsV2: {
                    data: tokenMetadata,
                    isMutable: true,
                },
            });
            let insts;
            if (signers.length > 1) {
                // multiple signer
                const res = yield new Instruction([inst, inst2, inst3], [mint], feePayer).submit();
                console.log(res);
                insts = [inst4, inst5];
            }
            else {
                insts = [inst, inst2, inst3, inst4, inst5];
            }
            return new Instruction(insts, signers, feePayer, mint.publicKey.toBase58());
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map