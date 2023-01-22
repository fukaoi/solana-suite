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
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, createAssociatedTokenAccountInstruction, createMintToInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { createCreateMetadataAccountV2Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMetadataPda } from '@metaplex-foundation/js';
import { Node, Instruction, Try } from '@solana-suite/shared';
export var SplToken;
(function (SplToken) {
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, tokenMetadata, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            !feePayer && (feePayer = signers[0]);
            const connection = Node.getConnection();
            const lamports = yield getMinimumBalanceForRentExemptMint(connection);
            const mint = Keypair.generate();
            signers.push(mint);
            const metadataPda = yield findMetadataPda(mint.publicKey);
            const tokenAssociated = yield getAssociatedTokenAddress(mint.publicKey, owner);
            const inst = SystemProgram.createAccount({
                fromPubkey: owner,
                newAccountPubkey: mint.publicKey,
                space: MINT_SIZE,
                lamports: lamports,
                programId: TOKEN_PROGRAM_ID,
            });
            const inst2 = createInitializeMintInstruction(mint.publicKey, mintDecimal, owner, owner, TOKEN_PROGRAM_ID);
            const inst3 = createAssociatedTokenAccountInstruction(owner, 
            // tokenAssociated.toPublicKey(),
            tokenAssociated, owner, mint.publicKey);
            const inst4 = createMintToInstruction(mint.publicKey, 
            // tokenAssociated.toPublicKey(),
            tokenAssociated, owner, totalAmount);
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
            return new Instruction([inst, inst2, inst3, inst4, inst5], signers, feePayer, mint.publicKey.toBase58());
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map