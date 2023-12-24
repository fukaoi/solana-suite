import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { RegularNft } from '~/suite-regular-nft';
import { Storage } from '~/storage';
import { Node } from '~/node';
import { debugLog, Result, Try } from '~/shared';
import { Account } from '~/account';
import { Validator, ValidatorError } from '~/validator';
import { Converter } from '~/converter';
import { PhantomProvider } from '~/types/phantom';
import { InputNftMetadata } from '~/types/regular-nft';

export namespace PhantomMetaplex {
  /**
   * Upload content and NFT mint
   *
   * @param {InputNftMetadata}  input
   * @param {string}  cluster
   * @param {Phantom} phantom //phantom wallet object
   * @return Promise<Result<string, Error | ValidatorError>>
   */
  export const mint = async (
    input: InputNftMetadata,
    cluster: string,
    phantom: PhantomProvider,
  ): Promise<Result<string, Error | ValidatorError>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      if (!input.filePath || !input.storageType) {
        throw Error('Not found filePath or storageType');
      }

      Node.changeConnection({ cluster });

      //Convert porperties, Upload content
      const properties = await Converter.Properties.intoInfra(
        input.properties,
        Storage.uploadFile,
        input.storageType,
      );

      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(royalty);
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
      const uri = uploaded.value;

      const datav2 = Converter.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      const connection = Node.getConnection();
      const mint = Account.Keypair.create();
      const isMutable = true;

      debugLog('# properties: ', properties);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# mint: ', mint.pubkey);

      const tx = new Transaction();

      const insts = await RegularNft.createMint(
        mint.toPublicKey(),
        phantom.publicKey!,
        datav2,
        phantom.publicKey!,
        isMutable,
      );

      insts.forEach((inst: TransactionInstruction) => {
        tx.add(inst);
      });
      tx.feePayer = phantom.publicKey!;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      tx.recentBlockhash = blockhashObj.value.blockhash;
      tx.partialSign(mint.toKeypair());
      const signed = await phantom.signTransaction(tx);
      debugLog(
        '# signed, signed.signatures: ',
        signed,
        signed.signatures.map((sig) => sig.publicKey.toString()),
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint.pubkey;
    });
  };
}
