import { Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';

import { debugLog, Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { Storage } from '~/storage';
import { SplToken } from '~/suite-spl-token';
import { PhantomProvider } from '~/types/phantom';
import { InputTokenMetadata } from '~/types/spl-token';
import { InputNftMetadata } from '~/types/regular-nft';
import { Converter } from '~/converter';

export namespace PhantomSplToken {
  /**
   * Mint new spl-token
   *
   * @param {InputNftMetadata}  input
   * @param {Pubkey}  owner
   * @param {string}  cluster
   * @param {number}  totalAmount
   * @param {number}  mintDecimal
   * @param {Phantom} phantom //phantom wallet object
   * @return Promise<Result<string, Error>>
   */
  export const mint = async (
    input: InputTokenMetadata,
    owner: Pubkey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: PhantomProvider,
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction();
      const mint = Keypair.generate();

      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input as InputNftMetadata,
        input.royalty,
      );

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          tokenStorageMetadata,
          input.filePath,
          input.storageType,
        );

        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }

      const isMutable = true;

      const datav2 = Converter.TokenMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      debugLog('# datav2: ', datav2);
      debugLog('# upload content url: ', uri);

      const insturctions = await SplToken.createMint(
        mint.publicKey,
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        datav2,
        owner.toPublicKey(),
        isMutable,
      );

      insturctions.forEach((inst: TransactionInstruction) =>
        transaction.add(inst),
      );
      transaction.feePayer = owner.toPublicKey();
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      transaction.partialSign(mint);
      const signed = await phantom.signTransaction(transaction);
      debugLog(
        '# signed, signed.signatures: ',
        signed,
        signed.signatures.map((sig) => sig.publicKey.toString()),
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint.publicKey.toString();
    });
  };
}
