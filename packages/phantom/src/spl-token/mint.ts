import { Transaction, TransactionInstruction, Keypair } from '@solana/web3.js';

import {
  Node,
  Result,
  Try,
  debugLog,
  Pubkey,
  overwriteObject,
} from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
import { Phantom } from '../types';
import {
  Creators,
  InputTokenMetadata,
  _InputNftMetadata,
  _TokenMetadata,
} from '@solana-suite/shared-metaplex';

export namespace PhantomSplToken {
  export const mint = async (
    input: InputTokenMetadata,
    owner: Pubkey,
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

      const creatorsValue = Creators.toInputConvert(input.creators);
      const overwrited = overwriteObject(input, [
        {
          existsKey: 'creators',
          will: {
            key: 'creators',
            value: creatorsValue,
          },
        },
      ]) as _InputNftMetadata;

      const uploaded = await Storage.uploadMetaContent(overwrited);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const tokenMetadata: _TokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        collection: undefined,
        uses: reducedMetadata.uses,
      };

      const isMutable = !reducedMetadata.isMutable ? false : true;

      const insturctions = await SplToken.createMintInstructions(
        mint.publicKey,
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        tokenMetadata,
        owner.toPublicKey(),
        isMutable
      );

      insturctions.forEach((inst: TransactionInstruction) =>
        transaction.add(inst)
      );
      transaction.feePayer = owner.toPublicKey();
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
