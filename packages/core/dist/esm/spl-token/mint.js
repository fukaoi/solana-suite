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
import { Node, } from '@solana-suite/shared';
import { SplToken as _Calculate } from './calculate-amount';
import { Bundlr } from '@solana-suite/storage';
export var SplToken;
(function (SplToken) {
    SplToken.createMintInstructions = (mint, owner, totalAmount, mintDecimal, tokenMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        const metadataPda = Bundlr.make().nfts().pdas().metadata({ mint: mint }); //todo: replaced getMetadataPda()
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
    // export const mint = async (
    //   owner: Pubkey,
    //   signer: Secret,
    //   totalAmount: number,
    //   mintDecimal: number,
    //   input: InputTokenMetadata,
    //   feePayer?: Secret
    // ): Promise<Result<MintInstruction, Error>> => {
    //   return Try(async () => {
    //     const valid = Validator.checkAll<InputTokenMetadata>(input);
    //     if (valid.isErr) {
    //       throw valid.error;
    //     }
    //
    //     const payer = feePayer ? feePayer.toKeypair() : signer.toKeypair();
    //     input.royalty = input.royalty ? input.royalty : 0;
    //
    //     let overwrited = input as _InputNftMetadata;
    //     if (input.creators) {
    //       const creatorsValue = Creators.toInputConvert(input.creators);
    //       overwrited = overwriteObject(input, [
    //         {
    //           existsKey: 'creators',
    //           will: {
    //             key: 'creators',
    //             value: creatorsValue,
    //           },
    //         },
    //       ]) as _InputNftMetadata;
    //     }
    //
    //     debugLog('# overwrited: ', overwrited);
    //
    //     const sellerFeeBasisPoints = Royalty.convert(overwrited.royalty);
    //     const nftStorageMetadata = Storage.toConvertNftStorageMetadata(
    //       overwrited,
    //       sellerFeeBasisPoints,
    //       overwrited.options
    //     );
    //
    //     const uploaded = await Storage.uploadMetaContent(overwrited, feePayer);
    //     const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
    //
    //     debugLog('# upload content url: ', uri);
    //     debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
    //     debugLog('# reducedMetadata: ', reducedMetadata);
    //
    //     const tokenMetadata: _TokenMetadata = {
    //       name: reducedMetadata.name,
    //       symbol: reducedMetadata.symbol,
    //       uri,
    //       sellerFeeBasisPoints,
    //       creators: reducedMetadata.creators,
    //       uses: reducedMetadata.uses,
    //       collection: undefined,
    //     };
    //     const isMutable = !reducedMetadata.isMutable ? false : true;
    //
    //     const mint = KeypairAccount.create();
    //     const insts = await createMintInstructions(
    //       mint.toPublicKey(),
    //       owner.toPublicKey(),
    //       totalAmount,
    //       mintDecimal,
    //       tokenMetadata as DataV2,
    //       payer.publicKey,
    //       isMutable
    //     );
    //     return new MintInstruction(
    //       insts,
    //       [signer.toKeypair(), mint.toKeypair()],
    //       payer,
    //       mint.pubkey
    //     );
    //   });
    // };
})(SplToken || (SplToken = {}));
//# sourceMappingURL=mint.js.map