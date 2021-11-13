import {
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';


import {
  Keypair,
  ParsedConfirmedTransaction,
  ParsedInstruction,
  PublicKey,
  TokenBalance,
  Signer,
} from '@solana/web3.js';

import {Transaction, Node, Result, Append, Instruction, Util, Wallet} from './';
import {Constants} from './constants';
import {MintInstruction} from './instructions/mint';

export namespace SplToken {
  export interface TransferHistory {
    info: {
      destination: string,
      source: string,
      authority?: string,
      multisigAuthority?: string,
      signers?: string[],
      amount?: string,
      mint?: string,
      tokenAmount?: any[],
    },
    type: string,
    date: Date,
  }

  export interface TransferDestinationList {
    dest: PublicKey,
    date: Date,
  }

  enum TransactionStatus {
    Transfer = 'transfer',
    TransferChecked = 'transferChecked',
  }

  const isTransfer = (value: ParsedInstruction) => {
    if (value.program === 'spl-token') {
      switch (value.parsed.type) {
        case TransactionStatus.Transfer:
        case TransactionStatus.TransferChecked:
          return true;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  const convertTimestmapToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const subscribeAccount = (
    pubkey: PublicKey,
    callback: any
  ): number => {
    return Node.getConnection().onAccountChange(pubkey, async () => {
      const res = await SplToken.getTransferHistory(pubkey, 1);
      if (res.isErr) return res;
      callback((res.value as TransferHistory[])[0]);
    });
  }

  export const unsubscribeAccount = (subscribeId: number)
    : Promise<void> =>
    Node.getConnection().removeAccountChangeListener(subscribeId);


  export const getTransferHistory = async (
    pubkey: PublicKey,
    limit?: number
  ): Promise<Result<TransferHistory[], Error>> => {
    const transactions = await Transaction.getAll(pubkey, limit);

    if (transactions.isErr) return transactions as Result<[], Error>;

    const hist: TransferHistory[] = [];
    for (const tx of transactions.unwrap() as ParsedConfirmedTransaction[]) {
      for (const inst of tx.transaction.message.instructions) {
        const value = inst as ParsedInstruction;
        if (isTransfer(value)) {
          const v: TransferHistory = value.parsed;
          v.date = convertTimestmapToDate(tx.blockTime as number);
          hist.push(v);
        }
      }
    }
    return Result.ok(hist);
  }

  export const getTransferDestinationList = async (
    pubkey: PublicKey
  ): Promise<Result<TransferDestinationList[], Error>> => {
    const transactions = await Transaction.getAll(pubkey);

    if (transactions.isErr) return Result.err(transactions.error);

    const hist: TransferDestinationList[] = [];
    for (const tx of transactions.unwrap() as ParsedConfirmedTransaction[]) {
      const posts = tx.meta?.postTokenBalances as TokenBalance[];
      if (!Util.isEmpty(posts.length)) {
        posts.forEach((p) => {
          const amount = p!.uiTokenAmount!.uiAmount as number;
          if (amount > 0) {
            const index = p.accountIndex;
            const dest = tx.transaction.message.accountKeys[index].pubkey;
            const date = convertTimestmapToDate(tx.blockTime as number);
            const v: TransferDestinationList = {dest, date};
            hist.push(v);
          }
        });
      }
    }
    return Result.ok(hist);
  }

  export const mint2 = async (
    source: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
    // ): Promise<Result<string, Error>> => {
  ) => {
    const account = Keypair.generate();
    console.log('account: ', account.publicKey.toBase58());

    // todo: check error
    const balanceNeeded = await Node.getConnection().getMinimumBalanceForRentExemption(MintInstruction.Layout.span);

    !feePayer && (feePayer = signers[0]);

    const inst1 = MintInstruction.account(
      account,
      feePayer,
      balanceNeeded,
    );

    const inst2 = MintInstruction.initMint(
      account.publicKey,
      mintDecimal,
      source,
      source,
    );

    await new Instruction(
      [inst1, inst2],
      [account],
      feePayer
    ).submit();

    // const tokenAssociated = await Wallet.getAssociatedTokenAddress(
    // account.publicKey,
    // source,
    // false,
    // ).value;


    const tokenAssociated = await Token.getAssociatedTokenAddress(
      Constants.ASSOCIATED_TOKEN_PROGRAM_ID,
      Constants.TOKEN_PROGRAM_ID,
      account.publicKey,
      source
    );

    // if (tokenAssociated.isErr) {
    // // return Result.err(tokenAssociated.error);
    // return tokenAssociated.error;
    // }

    // console.log(tokenAssociated.value.toBase58());
    console.log(tokenAssociated);
    await Util.sleep(15);

    const inst3 = MintInstruction.mintToChecked(
      account.publicKey,
      // tokenAssociated.value,
      tokenAssociated,
      source,
      signers,
      totalAmount,
      mintDecimal
    );

    return new Instruction(
      // [inst1, inst2, inst3],
      [inst3],
      [account, ...signers],
      feePayer
    );

    // return (res as Result<string, Error>).chain(
    // (_value: string) => Result.ok(token.publicKey.toBase58()),
    // (error: Error) => Result.err(error)
    // );
  }

  export const mint = (
    source: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
  ) => async (append?: Append.Value)
      : Promise<Result<Instruction, Error>> => {
      const tokenRes = await Token.createMint(
        Node.getConnection(),
        signers[0],
        source,
        null,
        mintDecimal,
        TOKEN_PROGRAM_ID
      )
        .then(Result.ok)
        .catch(Result.err);

      if (tokenRes.isErr) return Result.err(tokenRes.error);
      const token = tokenRes.value;

      // Check comformability of fee payer
      if (append?.feePayer) {
        if (!Append.isInFeePayer(append.feePayer, signers))
          return Result.err(Error('Not found fee payer secret key in signers'));
        token.payer = Append.extractFeePayerKeypair(
          signers,
          append?.feePayer,
        )[0];
      }

      // Check comformability of multiSig
      let authority = source;
      append?.multiSig && (authority = append.multiSig);

      const tokenAssociated =
        await token.getOrCreateAssociatedAccountInfo(source)
          .then(Result.ok)
          .catch(Result.err);

      if (tokenAssociated.isErr) return Result.err(tokenAssociated.error);

      const inst = Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        token.publicKey,
        tokenAssociated.value.address,
        authority,
        signers,
        totalAmount
      );

      return Result.ok(
        new Instruction(
          [inst],
          signers,
        ));

      // const res = await token.mintTo(
      // tokenAssociated.value.address,
      // authority,
      // signers,
      // totalAmount,
      // )
      // .then(Result.ok)
      // .catch(Result.err);

      // return (res as Result<string, Error>).chain(
      // (_value: string) => Result.ok(token.publicKey.toBase58()),
      // (error: Error) => Result.err(error)
      // );
    }

  export const transfer = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const token = new Token(
      Node.getConnection(),
      tokenKey,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const sourceToken = await token.getOrCreateAssociatedAccountInfo(owner)
      .then(Result.ok)
      .catch(Result.err);

    if (sourceToken.isErr) return Result.err(sourceToken.error);

    const destToken = await token.getOrCreateAssociatedAccountInfo(dest)
      .then(Result.ok)
      .catch(Result.err);

    if (destToken.isErr) return Result.err(destToken.error);

    const instruction = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceToken.value.address,
      tokenKey,
      destToken.value.address,
      owner,
      signers,
      amount,
      mintDecimal
    );

    return Result.ok(
      new Instruction(
        [instruction],
        signers,
        feePayer
      ));
  }
}
