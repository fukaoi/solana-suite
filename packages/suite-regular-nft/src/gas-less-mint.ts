import { debugLog, Result, Try } from '~/suite-utils';
import { Pubkey, Secret } from '~/types/account';
import { GasLessMintOptions, InputNftMetadata } from '~/types/regular-nft';
import { Node } from '~/node';
import { TransactionBuilder } from '~/transaction-builder';
import { Storage } from '~/storage';
import { Converter } from '~/converter';
import { Validator } from '~/validator';
import { Account } from '~/account';
import { RegularNft as Mint } from './mint';
import { Transaction } from '@solana/web3.js';
import { PartialSignStructure } from '~/types/transaction-builder';

export namespace RegularNft {
  const DEFAULT_STORAGE_TYPE = 'nftStorage';

  /**
   * Mint without solana sol, delegate feepayer for commission
   *
   * @param {Secret} owner         // owner's Secret
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
   * @param {Secret} feePayer        // fee payer
   * @param {Partial<GasLessMintOptions>} options         // options
   * @return Promise<Result<PartialSignStructure, Error>>
   */
  export const gasLessMint = async (
    owner: Secret,
    input: InputNftMetadata,
    feePayer: Pubkey,
    options: Partial<GasLessMintOptions> = {},
  ): Promise<Result<PartialSignStructure, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(royalty);
      const ownerPublickey = owner.toKeypair().publicKey;

      //--- porperties, Upload content ---
      let uri = '';
      if (input.filePath) {
        const properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
        );

        const storageMetadata = Storage.toConvertOffchaindata(
          { ...input, properties },
          sellerFeeBasisPoints,
        );

        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        debugLog('# upload content url: ', uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }
      //--- porperties, Upload content ---

      let datav2 = Converter.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      //--- collection ---
      let collection;
      if (input.collection && input.collection) {
        collection = Converter.Collection.intoInfra(input.collection);
        datav2 = { ...datav2, collection };
      }
      //--- collection ---

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# datav2: ', datav2);

      const mint = Account.Keypair.create();
      const insts = await Mint.createMint(
        mint.toPublicKey(),
        ownerPublickey,
        datav2,
        feePayer.toPublicKey(),
        isMutable,
      );

      // freezeAuthority
      if (options.freezeAuthority) {
        insts.push(
          Mint.createDeleagate(
            mint.toPublicKey(),
            ownerPublickey,
            options.freezeAuthority.toPublicKey(),
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

      if (options.isPriorityFee) {
        tx.add(
          await TransactionBuilder.PriorityFee.createPriorityFeeInstruction(tx),
        );
      }

      tx.recentBlockhash = blockhashObj.blockhash;
      [owner, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new TransactionBuilder.PartialSign(hex, mint.pubkey);
    });
  };
}
