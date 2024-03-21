import {
  // AddressLookupTableAccount,
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  TransactionMessage,
  // VersionedTransaction,
} from '@solana/web3.js';
import { Node } from '~/node';
import { debugLog } from '../../suite-utils/src/shared';

export namespace TransactionBuilder {
  export namespace ComputeUnit {
    export const simulate = async (
      instructions: TransactionInstruction[],
      payer: Keypair,
      // lookupTables: AddressLookupTableAccount[],
    ): Promise<number | undefined> => {
      const testInstructions = [
        ComputeBudgetProgram.setComputeUnitLimit({ units: 1_400_000 }),
        ...instructions,
      ];

      // const testVersionedTxn = new VersionedTransaction(
      //   new TransactionMessage({
      //     instructions: testInstructions,
      //     payerKey: payer,
      //     recentBlockhash: PublicKey.default.toString(),
      //   }).compileToV0Message(lookupTables),
      // );

      const testVersionedTxn = new Transaction(
        new TransactionMessage({
          instructions: testInstructions,
          payerKey: payer.publicKey,
          recentBlockhash: PublicKey.default.toString(),
        }).compileToV0Message(),
      );

      console.log('1');

      const simulation = await Node.getConnection().simulateTransaction(
        testVersionedTxn,
        [payer],
      );

      debugLog('# simulation: ', simulation);

      if (simulation.value.err) {
        return undefined;
      }
      return simulation.value.unitsConsumed;
    };
  }
}
