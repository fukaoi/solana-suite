import {
  ComputeBudgetProgram,
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import { Constants, debugLog, Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { MAX_RETRIES, MINIMUM_PRIORITY_FEE } from './common';
import { MintStructure, SubmitOptions } from '~/types/transaction-builder';
import { Pubkey } from '~/types/account';
import { DasApi } from '~/das-api';

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

    submit = async (
      options: Partial<SubmitOptions> = {},
    ): Promise<Result<TransactionSignature, Error>> => {
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

        const confirmOptions: ConfirmOptions = {
          maxRetries: MAX_RETRIES,
        };

        if (Node.getConnection().rpcEndpoint === Constants.EndPointUrl.prd) {
          debugLog('# Change metaplex cluster on mainnet-beta');
          Node.changeConnection({ cluster: Constants.Cluster.prdMetaplex });
        }

        if (options.isPriorityFee) {
          const estimates = await DasApi.getPriorityFeeEstimate(transaction);
          debugLog('# estimates: ', estimates);
          try {
            // priority fee: medium
            const lamports = estimates.isOk
              ? estimates.unwrap().medium
              : MINIMUM_PRIORITY_FEE;
            debugLog('# lamports: ', lamports);
            return this.sendTransactionWithPriorityFee(
              lamports,
              transaction,
              finalSigners,
              confirmOptions,
            );
          } catch (error) {
            debugLog('# priority fee error: ', error);
            // priority fee: high
            const lamports = estimates.isOk
              ? estimates.unwrap().high
              : MINIMUM_PRIORITY_FEE;
            return this.sendTransactionWithPriorityFee(
              lamports,
              transaction,
              finalSigners,
              confirmOptions,
            );
          }
        } else {
          return await sendAndConfirmTransaction(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions,
          );
        }
      });
    };

    sendTransactionWithPriorityFee = async (
      lamports: number,
      transaction: Transaction,
      finalSigners: Keypair[],
      confirmOptions: ConfirmOptions,
    ) => {
      const computePriceInst = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports,
      });

      // priority fee: medium
      transaction.add(computePriceInst);

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        confirmOptions,
      );
    };
  }
}
