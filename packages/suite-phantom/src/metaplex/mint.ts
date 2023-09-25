import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { Metaplex } from '@solana-suite/nft';
import { Storage } from 'storage';
import {
  debugLog,
  Node,
  Result,
  Try,
} from 'shared';
import { KeypairAccount } from 'account';
import { UserSideInput } from 'types/converter';
import { Validator, ValidatorError } from 'validator';
import { Converter } from 'converter';
import { Phantom } from '../types';

export namespace PhantomMetaplex {
  /**
   * Upload content and NFT mint
   *
   * @param {UserSideInput.NftMetadata}  input
   * @param {Phantom} phantom        phantom wallet object
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: UserSideInput.NftMetadata,
    cluster: string,
    phantom: Phantom,
  ): Promise<Result<string, Error | ValidatorError>> => {
    return Try(async () => {
      const valid = Validator.checkAll<UserSideInput.NftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      if (!input.filePath || !input.storageType) {
        throw Error('Not found filePath or storageType');
      }

      Node.changeConnection({ cluster });

      //Convert porperties, Upload content
      const properties = await Converter.Properties.intoInfraSide(
        input.properties,
        Storage.uploadContent,
        input.storageType,
      );

      const sellerFeeBasisPoints = Converter.Royalty.intoInfraSide(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        { ...input, properties },
        sellerFeeBasisPoints,
      );
      const uploaded = await Storage.uploadMetaAndContent(
        nftStorageMetadata,
        input.filePath,
        input.storageType,
      );

      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;

      const datav2 = Converter.NftMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      const connection = Node.getConnection();
      const mint = KeypairAccount.create();
      const isMutable = true;

      debugLog('# properties: ', properties);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# mint: ', mint.pubkey);

      const tx = new Transaction();

      const insts = await Metaplex.createMintInstructions(
        mint.toPublicKey(),
        phantom.publicKey,
        datav2,
        phantom.publicKey,
        isMutable,
      );

      insts.forEach((inst: TransactionInstruction) => {
        tx.add(inst);
      });
      tx.feePayer = phantom.publicKey;
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
