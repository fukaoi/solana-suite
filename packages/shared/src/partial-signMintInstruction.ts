import {
  TransactionSignature,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node, Result, Try, Secret, debugLog, Constants, Pubkey } from './';
import { MAX_RETRIES } from './instruction/define';

export class PartialSignMintInstruction {
  hexInstruction: string;
  data: Pubkey;

  constructor(instructions: string, mint: Pubkey) {
    this.hexInstruction = instructions;
    this.data = mint; // Variables for mint address
  }

  submit = async (
    feePayer: Secret
  ): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof PartialSignMintInstruction)) {
        throw Error('only PartialSignInstruction object that can use this');
      }

      const decode = Buffer.from(this.hexInstruction, 'hex');
      const transactionFromJson = Transaction.from(decode);
      transactionFromJson.partialSign(feePayer.toKeypair());

      const options: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };

      if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
        debugLog('# Change metaplex cluster on mainnet-beta');
        Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
      }

      const wireTransaction = transactionFromJson.serialize();
      return await Node.getConnection().sendRawTransaction(
        wireTransaction,
        options
      );
    });
  };
}
