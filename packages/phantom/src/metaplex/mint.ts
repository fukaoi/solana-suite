import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { Metaplex } from '@solana-suite/nft';
import { Storage } from '@solana-suite/storage';
import {
  debugLog,
  Node,
  Result,
  Try,
  KeypairAccount,
} from '@solana-suite/shared';
import {
  Royalty,
  Validator,
  ValidatorError,
  InputNftMetadata,
  Properties,
  MetaplexMetadata,
} from '@solana-suite/shared-metaplex';
import { Phantom } from '../types';

export namespace PhantomMetaplex {
  /**
   * Upload content and NFT mint
   *
   * @param {InputNftMetadata}  input
   * @param {Phantom} phantom        phantom wallet object
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: InputNftMetadata,
    cluster: string,
    phantom: Phantom
  ): Promise<Result<string, Error | ValidatorError>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      Node.changeConnection({ cluster });

      //Convert porperties, Upload content
      const properties = await Properties.toConvertInfra(
        input.properties,
        Storage.uploadContent,
        input.storageType!
      );

      input = {
        ...input,
        properties,
      };

      const sellerFeeBasisPoints = Royalty.convert(input.royalty);
      const nftStorageMetadata = Storage.toConvertNftStorageMetadata(
        input,
        sellerFeeBasisPoints
      );
      const uploaded = await Storage.uploadMetaContent(
        nftStorageMetadata,
        input.filePath!,
        input.storageType!
      );

      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;

      const datav2 = MetaplexMetadata.toConvertInfra(
        input,
        uri,
        sellerFeeBasisPoints
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
        isMutable
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
        signed.signatures.map((sig) => sig.publicKey.toString())
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint.pubkey;
    });
  };
}
