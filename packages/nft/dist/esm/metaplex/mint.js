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
import BN from 'bn.js';
import { createAssociatedTokenAccountInstruction, createInitializeMintInstruction, createMintToCheckedInstruction, getAssociatedTokenAddress, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { debugLog, Try, MintInstruction, KeypairAccount, } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { Validator, Properties, Pda, Royalty, MetaplexMetadata, Collections, } from '@solana-suite/shared-metaplex';
import { createCreateMetadataAccountV3Instruction, createCreateMasterEditionV3Instruction, } from '@metaplex-foundation/mpl-token-metadata';
import { Node } from '@solana-suite/shared';
export var Metaplex;
(function (Metaplex) {
    Metaplex.createMintInstructions = (mint, owner, nftMetadata, feePayer, isMutable) => __awaiter(this, void 0, void 0, function* () {
        const ata = yield getAssociatedTokenAddress(mint, owner);
        const tokenMetadataPubkey = Pda.getMetadata(mint);
        const masterEditionPubkey = Pda.getMasterEdition(mint);
        const connection = Node.getConnection();
        const inst1 = SystemProgram.createAccount({
            fromPubkey: feePayer,
            newAccountPubkey: mint,
            lamports: yield getMinimumBalanceForRentExemptMint(connection),
            space: MINT_SIZE,
            programId: TOKEN_PROGRAM_ID,
        });
        const inst2 = createInitializeMintInstruction(mint, 0, owner, owner);
        const inst3 = createAssociatedTokenAccountInstruction(feePayer, ata, owner, mint);
        const inst4 = createMintToCheckedInstruction(mint, ata, owner, 1, 0);
        const inst5 = createCreateMetadataAccountV3Instruction({
            metadata: tokenMetadataPubkey,
            mint,
            mintAuthority: owner,
            payer: feePayer,
            updateAuthority: owner,
        }, {
            createMetadataAccountArgsV3: {
                data: nftMetadata,
                isMutable,
                collectionDetails: { __kind: 'V1', size: new BN(1) },
            },
        });
        const inst6 = createCreateMasterEditionV3Instruction({
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
        return [inst1, inst2, inst3, inst4, inst5, inst6];
    });
    /**
     * Upload content and NFT mint
     *
     * @param {Pubkey} owner          // first minted owner
     * @param {Secret} signer         // owner's Secret
     * @param {InputNftMetadata} input
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
            //--- porperties, Upload content ---
            let properties;
            if (input.properties && input.storageType) {
                properties = yield Properties.toConvertInfra(input.properties, Storage.uploadContent, input.storageType, payer);
            }
            else if (input.properties && !input.storageType) {
                throw Error('Must set storageType if will use properties');
            }
            input = Object.assign(Object.assign({}, input), { properties });
            //--- porperties, Upload content ---
            const sellerFeeBasisPoints = Royalty.convert(input.royalty);
            const nftStorageMetadata = Storage.toConvertNftStorageMetadata(input, sellerFeeBasisPoints);
            let uri;
            if (input.filePath && input.storageType) {
                const uploaded = yield Storage.uploadMetaAndContent(nftStorageMetadata, input.filePath, input.storageType, payer);
                debugLog('# upload content url: ', uploaded);
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
            let datav2 = MetaplexMetadata.toConvertInfra(input, uri, sellerFeeBasisPoints);
            //--- collection ---
            let collection;
            if (input.collection && input.collection) {
                collection = Collections.toConvertInfra(input.collection);
                datav2 = Object.assign(Object.assign({}, datav2), { collection });
            }
            //--- collection ---
            const isMutable = input.isMutable === undefined ? true : input.isMutable;
            debugLog('# input: ', input);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# datav2: ', datav2);
            const mint = KeypairAccount.create();
            const insts = yield Metaplex.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, payer.toKeypair().publicKey, isMutable);
            return new MintInstruction(insts, [signer.toKeypair(), mint.toKeypair()], payer.toKeypair(), mint.pubkey);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=mint.js.map