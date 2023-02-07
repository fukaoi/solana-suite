import { Transaction, TransactionInstruction, PublicKey, Keypair } from '@solana/web3.js';

import { Node, Result, Try, debugLog } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
import { Phantom } from '../types';
import { StorageType } from '@solana-suite/shared-metaplex';

export namespace PhantomSplToken {
  export const mint = async (
    owner: PublicKey,
    cluster: string,
    totalAmount: number,
    mintDecimal: number,
    phantom: Phantom
  ): Promise<Result<string, Error>> => {
    return Try(async () => {
      Node.changeConnection({ cluster });
      const connection = Node.getConnection();
      const transaction = new Transaction();
      const mint = Keypair.generate();

      const input = {
        name: 'solana-suite-token',
        symbol: 'SST',
        royalty: 50,
        filePath: '../../../storage/test/assets/DOG.JPEG',
        storageType: 'nftStorage' as StorageType,
        isMutable: false,
      };
      
      debugLog('# input: ', input); 

      const uploaded = await Storage.uploadMetaContent(input);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      const tokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        collection: reducedMetadata.collection,
        uses: reducedMetadata.uses,
      };

      const isMutable = !reducedMetadata.isMutable ? false : true;

      const insturctions = await SplToken.createMintInstruction(
        connection,
        mint.publicKey,
        owner,
        totalAmount,
        mintDecimal,
        tokenMetadata,
        owner,
        isMutable
      );

      insturctions.forEach((inst: TransactionInstruction) => transaction.add(inst)); 
      transaction.feePayer = owner;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      transaction.partialSign(mint);
      const signed = await phantom.signAllTransactions([transaction]);

      // todo: refactoring
      console.log('signed', signed);
      (async () => {
        for (const sign of signed) {
          const sig = await connection.sendRawTransaction(sign.serialize());
          console.log(sig);
          await Node.confirmedSig(sig);
        }
      })();
      return mint.publicKey.toString();
    });
  };
}
