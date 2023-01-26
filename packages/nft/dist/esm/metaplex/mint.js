var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Keypair } from '@solana/web3.js';
import { debugLog, Try, MintInstruction } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { Bundlr, Validator, } from '@solana-suite/shared-metaplex';
import { token, TransactionBuilder, } from '@metaplex-foundation/js';
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
export var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    const createNftBuilder = (params, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const useNewMint = Keypair.generate();
        const updateAuthority = owner;
        const mintAuthority = owner;
        const tokenOwner = owner.publicKey;
        const inst = yield Metaplex.createNftBuilderInstruction(feePayer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner);
        return new MintInstruction(inst, [feePayer, useNewMint, owner], undefined, useNewMint.publicKey.toString());
    });
    Metaplex.createNftBuilderInstruction = (feePayer, params, useNewMint, updateAuthority, mintAuthority, tokenOwner) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        debugLog('# params: ', params);
        debugLog('# feePayer: ', feePayer === null || feePayer === void 0 ? void 0 : feePayer.publicKey.toString());
        debugLog('# useNewMint: ', useNewMint.publicKey.toString());
        debugLog('# updateAuthority: ', updateAuthority.publicKey.toString());
        debugLog('# mintAuthority: ', mintAuthority.publicKey.toString());
        debugLog('# tokenOwner: ', tokenOwner.toString());
        const metaplex = Bundlr.make(feePayer);
        const payer = metaplex.identity();
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { updateAuthority,
            mintAuthority, freezeAuthority: mintAuthority.publicKey, useNewMint,
            tokenOwner, tokenAmount: token(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = metaplex
            .nfts()
            .pdas()
            .masterEdition({ mint: mintAddress });
        return (TransactionBuilder.make()
            .setFeePayer(payer)
            .setContext({
            mintAddress,
            metadataAddress,
            masterEditionAddress,
            tokenAddress: tokenAddress,
        })
            // Create the mint, the token and the metadata.
            .add(sftBuilder)
            // Create master edition account (prevents further minting).
            .add({
            instruction: createCreateMasterEditionV3Instruction({
                edition: masterEditionAddress,
                mint: mintAddress,
                updateAuthority: updateAuthority.publicKey,
                mintAuthority: mintAuthority.publicKey,
                payer: payer.publicKey,
                metadata: metadataAddress,
            }, {
                createMasterEditionArgs: {
                    maxSupply: params.maxSupply === undefined ? 0 : params.maxSupply,
                },
            }),
            signers: [payer, mintAuthority, updateAuthority],
            key: (_a = params.createMasterEditionInstructionKey) !== null && _a !== void 0 ? _a : 'createMasterEdition',
        })
            .getInstructions());
    });
    /**
     * Upload content and NFT mint
     *
     * @param {NftMetadata}  input
     * {
     *   name: string               // nft content name
     *   symbol: string             // nft ticker symbol
     *   filePath: string | File    // nft ticker symbol
     *   royalty: number            // royalty percentage
     *   storageType: 'arweave'|'nftStorage' // royalty percentage
     *   description?: string       // nft content description
     *   external_url?: string      // landing page, home page uri, related url
     *   attributes?: JsonMetadataAttribute[]     // game character parameter, personality, characteristics
     *   properties?: JsonMetadataProperties<Uri> // include file name, uri, supported file type
     *   collection?: Collection                  // collections of different colors, shapes, etc.
     *   [key: string]?: unknown                   // optional param, Usually not used.
     *   creators?: Creator[]          // other creators than owner
     *   uses?: Uses                   // usage feature: burn, single, multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     * }
     * @param {Keypair} owner          // first minted owner
     * @param {Keypair} feePayer       // fee payer
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (input, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const payer = feePayer ? feePayer : owner;
            const uploaded = yield Storage.uploadMetaContent(input, payer);
            const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
            debugLog('# upload content url: ', uri);
            debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
            debugLog('# reducedMetadata: ', reducedMetadata);
            const mintInput = Object.assign({ uri,
                sellerFeeBasisPoints }, reducedMetadata);
            return yield createNftBuilder(mintInput, owner, payer);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=mint.js.map