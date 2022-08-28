var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey, Keypair } from '@solana/web3.js';
import { createNftOperation, createNftBuilder, findMetadataPda, findMasterEditionV2Pda, findAssociatedTokenAccountPda, } from '@metaplex-foundation/js';
import { Node, Instruction, Result, debugLog } from '@solana-suite/shared';
import { getMinimumBalanceForRentExemptMint, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { Validator } from '../../validator';
import { MetaplexRoyalty } from '../../metaplex';
// @internal
export var InternalsMetaplex_Mint;
(function (InternalsMetaplex_Mint) {
    /**
     * NFT mint
     *
     * @param {MetaplexMetaData}  metadata
     * {
     *   uri: string                   // basically storage uri
     *   name: string                  // NFT content name
     *   symbol: string                // NFT ticker symbol
     *   sellerFeeBasisPoints number   // Royalty percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multiple
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: BigNumber         // mint copies
     *   mintAuthority?: Signer        // mint authority
     *   updateAuthority?: Signer      // update minted authority
     *   freezeAuthority?: PublicKey   // freeze minted authority
     * }
     * @param {PublicKey} owner        // PublicKey that Owns nft
     * @param {Keypair} feePayer       // fee payer
     * @return {Promise<Result<Instruction, Error | ValidatorError>>}
     */
    InternalsMetaplex_Mint.create = (metadata, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const valid = Validator.checkAll(metadata);
        if (valid.isErr) {
            return Result.err(valid.error);
        }
        if (metadata.sellerFeeBasisPoints) {
            metadata.sellerFeeBasisPoints = MetaplexRoyalty.convertValue(metadata.sellerFeeBasisPoints);
        }
        const operation = createNftOperation(metadata);
        const mint = Keypair.generate();
        const tx = yield createNft(operation, mint, owner, feePayer);
        return Result.ok(new Instruction(tx, [mint], feePayer, mint.publicKey.toString()));
    });
    const resolveData = (input, metadata, updateAuthority) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        const metadataCreators = (_b = (_a = metadata.properties) === null || _a === void 0 ? void 0 : _a.creators) === null || _b === void 0 ? void 0 : _b.filter((creator) => creator.address).map((creator) => {
            var _a;
            return ({
                address: new PublicKey(creator.address),
                share: (_a = creator.share) !== null && _a !== void 0 ? _a : 0,
                verified: false,
            });
        });
        let creators = (_d = (_c = input.creators) !== null && _c !== void 0 ? _c : metadataCreators) !== null && _d !== void 0 ? _d : undefined;
        if (creators === undefined) {
            creators = [
                {
                    address: updateAuthority,
                    share: 100,
                    verified: true,
                },
            ];
        }
        else {
            creators = creators.map((creator) => {
                if (creator.address.toBase58() === updateAuthority.toBase58()) {
                    return Object.assign(Object.assign({}, creator), { verified: true });
                }
                else {
                    return creator;
                }
            });
        }
        return {
            name: (_f = (_e = input.name) !== null && _e !== void 0 ? _e : metadata.name) !== null && _f !== void 0 ? _f : '',
            symbol: (_h = (_g = input.symbol) !== null && _g !== void 0 ? _g : metadata.symbol) !== null && _h !== void 0 ? _h : '',
            uri: input.uri,
            sellerFeeBasisPoints: (_k = (_j = input.sellerFeeBasisPoints) !== null && _j !== void 0 ? _j : metadata.seller_fee_basis_points) !== null && _k !== void 0 ? _k : 500,
            creators,
            collection: (_l = input.collection) !== null && _l !== void 0 ? _l : null,
            uses: (_m = input.uses) !== null && _m !== void 0 ? _m : null,
        };
    };
    const createNft = (operation, mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const { 
        // uri,
        isMutable, maxSupply, payer = feePayer, mintAuthority = feePayer, updateAuthority = mintAuthority, freezeAuthority, tokenProgram = TOKEN_PROGRAM_ID, associatedTokenProgram, } = operation.input;
        debugLog('# metadata input: ', operation.input);
        debugLog('# metadata feePayer: ', feePayer.publicKey.toString());
        debugLog('# metadata mint: ', mint.publicKey.toString());
        debugLog('# mintAuthority: ', mintAuthority.publicKey.toString());
        debugLog('# updateAuthority: ', updateAuthority.publicKey.toString());
        debugLog('# owner: ', owner.toString());
        freezeAuthority &&
            debugLog('# freezeAuthority: ', freezeAuthority.toString());
        const metadata = {};
        // try {
        //   metadata = await Bundlr.make(feePayer).storage().downloadJson(uri);
        // } catch (e) {
        //   debugLog('# Error in createNft:', e);
        //   metadata = {};
        // }
        const data = resolveData(operation.input, metadata, updateAuthority.publicKey);
        debugLog('# resolveData: ', data);
        const metadataPda = findMetadataPda(mint.publicKey);
        const masterEditionPda = findMasterEditionV2Pda(mint.publicKey);
        const lamports = yield getMinimumBalanceForRentExemptMint(Node.getConnection());
        const associatedToken = findAssociatedTokenAccountPda(mint.publicKey, owner, tokenProgram, associatedTokenProgram);
        return createNftBuilder({
            lamports,
            data,
            isMutable,
            maxSupply,
            mint,
            payer,
            mintAuthority,
            updateAuthority,
            owner,
            associatedToken,
            freezeAuthority,
            metadata: metadataPda,
            masterEdition: masterEditionPda,
            tokenProgram,
            associatedTokenProgram,
        }).getInstructions();
    });
})(InternalsMetaplex_Mint || (InternalsMetaplex_Mint = {}));
