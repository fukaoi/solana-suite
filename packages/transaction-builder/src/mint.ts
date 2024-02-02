import {
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import { Constants, debugLog, Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { MAX_RETRIES } from './common';
import { MintStructure } from '~/types/transaction-builder';
import { Pubkey } from '~/types/account';

export namespace TransactionBuilder {
  export class Mint<T = Pubkey> implements MintStructure<T> {
    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer: Keypair;
    data: T;

    constructor(
      instructions: TransactionInstruction[],
      signers: Keypair[],
      feePayer: Keypair,
      data: T,
    ) {
      this.instructions = instructions;
      this.signers = signers;
      this.data = data;
      this.feePayer = feePayer;
    }

    submit = async (): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        if (!(this instanceof Mint)) {
          throw Error('only MintInstruction object that can use this');
        }
        const transaction = new Transaction();
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
}
