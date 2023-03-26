import { Transaction, TransactionInstruction, Keypair } from '@solana/web3.js';

import { Node, Result, Try, debugLog, Pubkey } from '@solana-suite/shared';
import { Storage } from '@solana-suite/storage';
import { SplToken } from '@solana-suite/core';
import { Phantom } from '../types';
import {
  TokenMetadata,
  InputTokenMetadata,
  InputNftMetadata,
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

      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const tokenStorageMetadata = Storage.toConvertNftStorageMetadata(
        input as InputNftMetadata,
        input.royalty
      );

      const uploaded = await Storage.uploadMetaContent(
        tokenStorageMetadata,
        input.filePath,
        input.storageType
      );

      if (uploaded.isErr) {
        throw uploaded;
      }
      const uri = uploaded.value;
      const isMutable = true;

      const datav2 = TokenMetadata.toConvertInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );

      debugLog('# datav2: ', datav2);
      debugLog('# upload content url: ', uri);

      const insturctions = await SplToken.createMintInstructions(
        mint.publicKey,
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        datav2,
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
