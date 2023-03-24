var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToCheckedInstruction, getAssociatedTokenAddress, } from '@solana/spl-token';
import { debugLog, Try, MintInstruction, KeypairAccount, } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { Validator, Creators, Collections, Properties, Pda, Royalty, } from '@solana-suite/shared-metaplex';
import { createCreateMetadataAccountV2Instruction, createCreateMasterEditionV3Instruction, } from '@metaplex-foundation/mpl-token-metadata';
export var Metaplex;
(function (Metaplex) {
    Metaplex.createMintInstructions = (mint, owner, nftMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        let ata = yield getAssociatedTokenAddress(mint, owner);
        let tokenMetadataPubkey = Pda.getMetadata(mint);
        let masterEditionPubkey = Pda.getMasterEdition(mint);
        const inst1 = createInitializeMintInstruction(mint, 0, owner, owner);
        const inst2 = createAssociatedTokenAccountInstruction(feePayer, ata, owner, mint);
        const inst3 = createMintToCheckedInstruction(mint, ata, feePayer, 1, 0);
        const inst4 = createCreateMetadataAccountV2Instruction({
            metadata: tokenMetadataPubkey,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV2: {
                data: nftMetadata,
                isMutable,
            },
        });
        const inst5 = createCreateMasterEditionV3Instruction({
            edition: masterEditionPubkey,
            mint,
            updateAuthority: owner,
            mintAuthority: owner,
            payer: feePayer,
            metadata: tokenMetadataPubkey,
        }, {
            createMasterEditionArgs: {
                maxSupply: 0,
            },
        });
        return [inst1, inst2, inst3, inst4, inst5];
    });
    /**
     * Upload content and NFT mint
     *
     * @param {Pubkey} owner          // first minted owner
     * @param {Secret} signer         // owner's Secret
     * @param {NftMetadata}  input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Pubkey           // collections of different colors, shapes, etc.
     *   [key: string]?: unknown       // optional param, Usually not used.
     *   creators?: InputCreators[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Secret} feePayer?       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (owner, signer, input, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : signer;
            //Convert creators
            const creators = Creators.toInputConvert(input.creators);
            debugLog('# creators: ', creators);
            //Convert collection
            const collection = Collections.toInputConvert(input.collection);
            debugLog('# collection: ', collection);
            //Convert porperties, Upload content
            const properties = yield Properties.toInputConvert(input.properties, Storage.uploadContent, input.storageType, feePayer);
            debugLog('# properties: ', properties);
            const overwrited = Object.assign(Object.assign({}, input), { creators,
                collection,
                properties });
            const sellerFeeBasisPoints = Royalty.convert(overwrited.royalty);
            const nftStorageMetadata = Storage.toConvertNftStorageMetadata(overwrited, sellerFeeBasisPoints);
            const uri = yield Storage.uploadMetaContent(nftStorageMetadata, overwrited.filePath, payer);
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            // debugLog('# reducedMetadata: ', reducedMetadata);
            const mint = KeypairAccount.create();
            const insts = yield Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), input, payer.toPublicKey(), input.isMutable || true);
            return new MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=mint.js.map