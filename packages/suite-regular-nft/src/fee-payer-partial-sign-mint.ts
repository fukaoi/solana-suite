import { debugLog, Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { Node } from '~/node';
import { PartialSignInstruction } from '~/instruction';
import { Storage } from '~/storage';
import { Converter } from '~/converter';
import { UserSideInput } from '~/types/converter';
import { Validator } from '~/validator';
import { KeypairAccount } from '~/account';
import { RegularNft as _Mint } from './mint';
import { Transaction } from '@solana/web3.js';

export namespace RegularNft {
  /**
   * Upload content and NFT mint with Partial Sign
   *
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {UserSideInput.NftMetadata} input
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
  export const feePayerPartialSignMint = async (
    owner: Pubkey,
    signer: Secret,
    input: UserSideInput.NftMetadata,
    feePayer: Pubkey,
    freezeAuthority?: Secret,
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<UserSideInput.NftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const sellerFeeBasisPoints = Converter.Royalty.intoInfraSide(
        input.royalty,
      );

      //--- porperties, Upload content ---
      let uri = '';
      if (input.filePath && input.storageType === 'nftStorage') {
        const properties = await Converter.Properties.intoInfraSide(
          input.properties,
          Storage.uploadFile,
          input.storageType,
        );

        const nftStorageMetadata = Storage.toConvertOffchaindata(
          { ...input, properties },
          sellerFeeBasisPoints,
        );

        const uploaded = await Storage.upload(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        debugLog('# upload content url: ', uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
      }
      //--- porperties, Upload content ---

      let datav2 = Converter.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      //--- collection ---
      let collection;
      if (input.collection && input.collection) {
        collection = Converter.Collection.intoInfraSide(input.collection);
        datav2 = { ...datav2, collection };
      }
      //--- collection ---

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# datav2: ', datav2);

      const mint = KeypairAccount.create();
      const insts = await _Mint.createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        feePayer.toPublicKey(),
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        insts.push(
          _Mint.createDeleagateInstruction(
            mint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      const blockhashObj = await Node.getConnection().getLatestBlockhash();
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
    });
  };
}
