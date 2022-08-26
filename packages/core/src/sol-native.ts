import {
  createWrappedNativeAccount,
  createMint,
  createTransferInstruction,
  createCloseAccountInstruction,
} from '@solana/spl-token';

import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Signer,
  Transaction
} from '@solana/web3.js';

import {
  Result,
  Node,
  Instruction,
  PartialSignInstruction,
  debugLog,
} from '@solana-suite/shared';


import {
  TransferHistory,
  Filter,
  DirectionFilter
} from './types/find'; 

import {Internals_find} from './internals/_find';
import {Internals} from './internals/_index';

export namespace SolNative {

  const RADIX = 10;

  // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
  // for multiSig only function
  export const transferWithMultisig = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    const connection = Node.getConnection();
    const payer = feePayer ? feePayer : signers[0];
    const wrapped = await createWrappedNativeAccount(
      connection,
      payer,
      owner,
      parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
    )
      .then(Result.ok)
      .catch(Result.err);

    if (wrapped.isErr) {
      return wrapped.error;
    }

    debugLog('# wrapped sol: ', wrapped.value.toBase58());

    const tokenRes = await createMint(
      connection,
      payer,
      owner,
      owner,
      0,
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;



    const sourceToken = await Internals.retryGetOrCreateAssociatedAccountInfo(
      token,
      owner,
      payer
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    debugLog('# sourceToken: ', sourceToken.value);

    const destToken = await Internals.retryGetOrCreateAssociatedAccountInfo(
      token,
      wrapped.value,
      payer
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    debugLog('# destToken: ', destToken.value);

    const inst1 = createTransferInstruction(
      sourceToken.value.toPublicKey(),
      destToken.value.toPublicKey(),
      owner,
      parseInt(`${amount}`, RADIX), // No lamports, its sol
      signers,
    );

    const inst2 = createCloseAccountInstruction(
      wrapped.value,
      dest,
      owner,
      signers,
    );

    return Result.ok(
      new Instruction(
        [inst1, inst2],
        signers,
        feePayer
      )
    );
  }

  export const transfer = async (
    source: PublicKey,
    destination: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer?: Signer
  ): Promise<Result<Instruction, Error>> => {
    const inst = SystemProgram.transfer({
      fromPubkey: source,
      toPubkey: destination,
      lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
    });

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      )
    );
  }

  export const feePayerPartialSignTransfer = async (
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    feePayer: PublicKey,
  ): Promise<Result<PartialSignInstruction, Error>> => {

    const blockHashObj = await Node.getConnection().getLatestBlockhash();
    const tx = new Transaction({
      blockhash: blockHashObj.blockhash,
      lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
      feePayer
    }).add(
      SystemProgram.transfer(
        {
          fromPubkey: owner,
          toPubkey: dest,
          lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`, RADIX),
        }
      ),
    );

    signers.forEach(signer => {
      tx.partialSign(signer);
    });

    try {
      const serializedTx = tx.serialize(
        {
          requireAllSignatures: false,
        }
      )
      const hex = serializedTx.toString('hex');
      return Result.ok(new PartialSignInstruction(hex));
    } catch (ex) {
      return Result.err(ex as Error);
    }
  }

  export const findByOwner = async (
    searchPubkey: PublicKey,
    options?: {
      limit?: number,
      actionFilter?: Filter[],
      directionFilter?: DirectionFilter,
    }
  ): Promise<Result<TransferHistory[], Error>> => {

    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        directionFilter: undefined,
      }
    }

    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [
          Filter.Transfer,
          Filter.TransferChecked,
        ];

    let bufferedLimit = 0;
    if (options.limit && options.limit < 50) {
      bufferedLimit = options.limit * 1.5; // To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Internals_find.getForAddress(searchPubkey, bufferedLimit, before);
      debugLog('# getTransactionHistory loop');
      const res = Internals_find.filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        false,
        options.directionFilter
      );
      hist = hist.concat(res);
      if (hist.length >= options.limit || res.length === 0) {
        hist = hist.slice(0, options.limit);
        break;
      }
      before = hist[hist.length - 1].sig;
    }
    return Result.ok(hist);
  }
}
