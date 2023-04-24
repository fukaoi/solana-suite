var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog, KeypairAccount, Node, PartialSignInstruction, Try, } from '@solana-suite/shared';
import { Transaction } from '@solana/web3.js';
import { Storage } from '@solana-suite/storage';
import { Collections, MetaplexMetadata, Properties, Royalty, Validator, } from '@solana-suite/shared-metaplex';
import { Metaplex as _Mint } from './mint';
export var Metaplex;
(function (Metaplex) {
    /**
     * Upload content and NFT mint with Partial Sign
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
     * }
     * @param {Secret} feePayer?         // fee payer
     * @param {Pubkey} freezeAuthority?  // freeze authority
     * @return Promise<Result<PartialSignInstruction, Error>>
     */
    Metaplex.feePayerPartialSignMint = (owner, signer, input, feePayer, freezeAuthority) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const valid = Validator.checkAll(input);
            if (valid.isErr) {
                throw valid.error;
            }
            const sellerFeeBasisPoints = Royalty.convert(input.royalty);
            //--- porperties, Upload content ---
            let uri = '';
            if (input.filePath && input.storageType === 'nftStorage') {
                const properties = yield Properties.toConvertInfra(input.properties, Storage.uploadContent, input.storageType);
                const nftStorageMetadata = Storage.toConvertNftStorageMetadata(Object.assign(Object.assign({}, input), { properties }), sellerFeeBasisPoints);
                const uploaded = yield Storage.uploadMetaAndContent(nftStorageMetadata, input.filePath, input.storageType);
                if (uploaded.isErr) {
                    throw uploaded;
                }
                uri = uploaded.value;
                debugLog('# upload content url: ', uploaded);
            }
            else if (input.uri) {
                uri = input.uri;
            }
            else {
                throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
            }
            //--- porperties, Upload content ---
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
            const insts = yield _Mint.createMintInstructions(mint.toPublicKey(), owner.toPublicKey(), datav2, feePayer.toPublicKey(), isMutable);
            // freezeAuthority
            if (freezeAuthority) {
                insts.push(_Mint.createDeleagateInstruction(mint.toPublicKey(), owner.toPublicKey(), freezeAuthority.toPublicKey()));
            }
            const blockhashObj = yield Node.getConnection().getLatestBlockhash();
            const tx = new Transaction({
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
                blockhash: blockhashObj.blockhash,
                feePayer: feePayer.toPublicKey(),
            });
            insts.forEach((inst) => tx.add(inst));
            tx.recentBlockhash = blockhashObj.blockhash;
            [signer, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new PartialSignInstruction(hex, mint.pubkey);
        }));
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=fee-payer-partial-sign-mint.js.map