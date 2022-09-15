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
import { createCreateMasterEditionV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { findMasterEditionV2Pda, token, TransactionBuilder, } from '@metaplex-foundation/js';
import { StorageNftStorage, StorageArweave, Validator, MetaplexRoyalty, Bundlr, } from '@solana-suite/nft';
import { Node, Result } from '@solana-suite/shared';
export var Metaplex;
(function (Metaplex) {
    // original: plugins/nftModule/operations/createNft.ts
    const createNftBuilder = (params, feePayer) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const metaplex = Bundlr.make(feePayer);
        const useNewMint = Keypair.generate();
        const payer = metaplex.identity();
        const updateAuthority = metaplex.identity();
        const mintAuthority = metaplex.identity();
        const tokenOwner = metaplex.identity().publicKey;
        const sftBuilder = yield metaplex
            .nfts()
            .builders()
            .createSft(Object.assign(Object.assign({}, params), { payer,
            updateAuthority,
            mintAuthority, freezeAuthority: mintAuthority.publicKey, useNewMint,
            tokenOwner, tokenAmount: token(1), decimals: 0 }));
        const { mintAddress, metadataAddress, tokenAddress } = sftBuilder.getContext();
        const masterEditionAddress = findMasterEditionV2Pda(mintAddress);
        const transactions = TransactionBuilder.make()
            .setFeePayer(payer)
            .setContext({
            mintAddress,
            metadataAddress,
            masterEditionAddress,
            tokenAddress: tokenAddress,
        })
            .add(sftBuilder)
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
            .toTransaction();
        const blockhashObj = yield Node.getConnection().getLatestBlockhashAndContext();
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
        const valid = Validator.checkAll(input);
        if (valid.isErr) {
            return Result.err(valid.error);
        }
        let storageRes;
        const { filePath, storageType, royalty } = input, reducedMetadata = __rest(input, ["filePath", "storageType", "royalty"]);
        const sellerFeeBasisPoints = MetaplexRoyalty.convertValue(royalty);
        const storageMetadata = initNftStorageMetadata(input, sellerFeeBasisPoints);
        if (storageType === 'arweave') {
            storageRes = yield (yield StorageArweave.uploadContent(filePath, phantom)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
                storageMetadata.image = ok;
                return yield StorageArweave.uploadMetadata(storageMetadata, phantom);
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
        console.log('# upload content url:', uri);
        const mintInput = Object.assign({ uri,
            sellerFeeBasisPoints }, reducedMetadata);
        const connection = Node.getConnection();
        const builder = yield createNftBuilder(mintInput, phantom);
        builder.tx.feePayer = phantom.publicKey;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        builder.tx.recentBlockhash = blockhashObj.value.blockhash;
        const signed = yield phantom.signTransaction(builder.tx);
        const sig = yield connection
            .sendRawTransaction(signed.serialize())
            .then(Result.ok)
            .catch(Result.err);
        if (sig.isErr) {
            return Result.err(sig.error);
        }
        yield Node.confirmedSig(sig.unwrap());
        return Result.ok(builder.mint.toString());
    });
})(Metaplex || (Metaplex = {}));
