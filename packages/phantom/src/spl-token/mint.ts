import {
  Transaction,
  TransactionInstruction,
  PublicKey,
  Keypair,
} from '@solana/web3.js';

import { Node, Result, Try, debugLog } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
import { Phantom } from '../types';
import { InputTokenMetadata } from '@solana-suite/shared-metaplex';

export namespace PhantomSplToken {
  export const mint = async (
    input: InputTokenMetadata,
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

      debugLog('# input: ', input);

      const uploaded = await Storage.uploadMetaContent(input);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

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

      insturctions.forEach((inst: TransactionInstruction) =>
        transaction.add(inst)
      );
      transaction.feePayer = owner;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      transaction.recentBlockhash = blockhashObj.value.blockhash;
      transaction.partialSign(mint);
      const signed = await phantom.signTransaction(transaction);
      debugLog(
        '# signed, signed.signatures: ',
        signed,
        signed.signatures.map((sig) => sig.publicKey.toString())
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return mint.publicKey.toString();
    });
  };
}
