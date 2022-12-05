import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Keypair,
  TransactionInstruction,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Constants, debugLog, Instruction, Node, Result, Try } from './';
import { MAX_RETRIES } from './instruction/define';

export class MintInstruction extends Instruction {
  constructor(
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown
  ) {
    super(instructions, signers, feePayer, data);
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof MintInstruction)) {
        throw Error('only MintInstruction object that can use this');
      }
      const transaction = new Transaction();
      let finalSigners = this.signers;
      if (this.feePayer) {
        transaction.feePayer = this.feePayer.publicKey;
        finalSigners = [this.feePayer, ...this.signers];
      }

      this.instructions.forEach((inst) => transaction.add(inst));
      const options: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };

      if (Constants.currentCluster === Constants.Cluster.prd) {
        debugLog('# Change metaplex cluster on mainnet-beta');
        Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
      }

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
}
