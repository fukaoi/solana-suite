"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const web3_js_1 = require("@solana/web3.js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
const js_1 = require("@metaplex-foundation/js");
const nft_1 = require("@solana-suite/nft");
const shared_1 = require("@solana-suite/shared");
var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    Metaplex.createNftBuilder = (params, feePayer) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaplex = nft_1.Bundlr.make(feePayer);
        const useNewMint = web3_js_1.Keypair.generate();
        const payer = metaplex.identity();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        console.log('# useNewMint: ', useNewMint.publicKey.toString());
        console.log('# payer: ', payer.publicKey.toString());
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { payer,
            updateAuthority,
            mintAuthority, freezeAuthority: mintAuthority.publicKey, useNewMint,
            tokenOwner, tokenAmount: (0, js_1.token)(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = (0, js_1.findMasterEditionV2Pda)(mintAddress);
        const transactions = js_1.TransactionBuilder.make()
            .setFeePayer(payer)
            .setContext({
            mintAddress,
            metadataAddress,
            masterEditionAddress,
            tokenAddress: tokenAddress,
        })
            .add(sftBuilder)
            .add({
            instruction: (0, mpl_token_metadata_1.createCreateMasterEditionV3Instruction)({
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
            .toTransaction();
        const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhashAndContext();
        transactions.recentBlockhash = blockhashObj.value.blockhash;
        transactions.partialSign(useNewMint);
        return { tx: transactions, mint: useNewMint.publicKey };
    });
    const initNftStorageMetadata = (input, sellerFeeBasisPoints) => {
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
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    Metaplex.mint = (input, phantom) => __awaiter(this, void 0, void 0, function* () {
        const valid = nft_1.Validator.checkAll(input);
        if (valid.isErr) {
            return shared_1.Result.err(valid.error);
        }
        let storageRes;
        const { filePath, storageType, royalty } = input, reducedMetadata = __rest(input, ["filePath", "storageType", "royalty"]);
        const sellerFeeBasisPoints = nft_1.MetaplexRoyalty.convertValue(royalty);
        const storageMetadata = initNftStorageMetadata(input, sellerFeeBasisPoints);
        if (storageType === 'arweave') {
            storageRes = yield (yield nft_1.StorageArweave.uploadContent(filePath, phantom)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageMetadata.image = ok;
                return yield nft_1.StorageArweave.uploadMetadata(storageMetadata, phantom);
            }), (err) => shared_1.Result.err(err));
        }
        else if (storageType === 'nftStorage') {
            storageRes = yield (yield nft_1.StorageNftStorage.uploadContent(filePath)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageMetadata.image = ok;
                return yield nft_1.StorageNftStorage.uploadMetadata(storageMetadata);
            }), (err) => shared_1.Result.err(err));
        }
        else {
            return shared_1.Result.err(Error('storageType is `arweave` or `nftStorage`'));
        }
        if (storageRes.isErr) {
            return shared_1.Result.err(storageRes.error);
        }
        const uri = storageRes.unwrap();
        const mintInput = Object.assign({ uri,
            sellerFeeBasisPoints }, reducedMetadata);
        const connection = shared_1.Node.getConnection();
        const builder = yield Metaplex.createNftBuilder(mintInput, phantom);
        builder.tx.feePayer = phantom.publicKey;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        builder.tx.recentBlockhash = blockhashObj.value.blockhash;
        const signed = yield phantom.signTransaction(builder.tx);
        const sig = yield connection
            .sendRawTransaction(signed.serialize())
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sig.isErr) {
            return shared_1.Result.err(sig.error);
        }
        yield shared_1.Node.confirmedSig(sig.unwrap());
        return shared_1.Result.ok(builder.mint.toString());
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
