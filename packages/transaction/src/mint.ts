import {
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction as Tx,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import { Constants, debugLog, Result, Try } from '~/shared';
import { Node } from '~/node';
import { MAX_RETRIES } from './define';

// TODO: rename Trasaction.Mint
export class MintTransaction<T> {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: T;

  constructor(
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: T,
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.data = data;
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof MintTransaction)) {
        throw Error('only MintInstruction object that can use this');
      }
      const transaction = new Tx();
      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
      transaction.recentBlockhash = blockhashObj.blockhash;
      let finalSigners = this.signers;

      if (this.feePayer) {
        transaction.feePayer = this.feePayer.publicKey;
        finalSigners = [this.feePayer, ...this.signers];
      }

      this.instructions.forEach((inst) => transaction.add(inst));

      const options: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };

      if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
        debugLog('# Change metaplex cluster on mainnet-beta');
        Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
      }

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        options,
      );
    });
  };
}
