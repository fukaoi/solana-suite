var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Keypair } from '@solana/web3.js';
import { StorageNftStorage, StorageArweave } from '../storage';
import { Instruction, Result } from '@solana-suite/shared';
import { Validator } from '../validator';
import { MetaplexRoyalty } from './royalty';
import { Bundlr } from '../bundlr';
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMasterEditionV2Pda, token, TransactionBuilder, } from '@metaplex-foundation/js';
export var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    const createNftBuilder = (params, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaplex = Bundlr.make();
        const useNewMint = Keypair.generate();
        const payer = feePayer;
        const updateAuthority = owner;
        const mintAuthority = owner;
        const tokenOwner = owner.publicKey;
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { payer,
            updateAuthority,
            mintAuthority, freezeAuthority: mintAuthority.publicKey, useNewMint,
            tokenOwner, tokenAmount: token(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = findMasterEditionV2Pda(mintAddress);
        const inst = TransactionBuilder.make()
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
            .getInstructions();
        return new Instruction(inst, [feePayer, useNewMint, owner], undefined, useNewMint.publicKey.toString());
    });
    Metaplex.initNftStorageMetadata = (input, sellerFeeBasisPoints) => {
        return {
            name: input.name,
            symbol: input.symbol,
            description: input.description,
            seller_fee_basis_points: sellerFeeBasisPoints,
            external_url: input.external_url,
            attributes: input.attributes,
            properties: input.properties,
            image: '',
        };
    };
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
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
        const valid = Validator.checkAll(input);
        if (valid.isErr) {
            return Result.err(valid.error);
        }
        const payer = feePayer ? feePayer : owner;
        let storageRes;
        const { filePath, storageType, royalty } = input, reducedMetadata = __rest(input, ["filePath", "storageType", "royalty"]);
        const sellerFeeBasisPoints = MetaplexRoyalty.convertValue(royalty);
        const storageMetadata = Metaplex.initNftStorageMetadata(input, sellerFeeBasisPoints);
        if (storageType === 'arweave') {
            storageRes = yield (yield StorageArweave.uploadContent(filePath, payer)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageMetadata.image = ok;
                return yield StorageArweave.uploadMetadata(storageMetadata, payer);
            }), (err) => Result.err(err));
        }
        else if (storageType === 'nftStorage') {
            storageRes = yield (yield StorageNftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageMetadata.image = ok;
                return yield StorageNftStorage.uploadMetadata(storageMetadata);
            }), (err) => Result.err(err));
        }
        else {
            return Result.err(Error('storageType is `arweave` or `nftStorage`'));
        }
        if (storageRes.isErr) {
            return Result.err(storageRes.error);
        }
        const uri = storageRes.unwrap();
        const mintInput = Object.assign({ uri,
            sellerFeeBasisPoints }, reducedMetadata);
        return Result.ok(yield createNftBuilder(mintInput, owner, payer));
    });
})(Metaplex || (Metaplex = {}));
