import {
  Account,
  createMint,
  createBurnCheckedInstruction,
  createMintToCheckedInstruction,
  createTransferCheckedInstruction,
  getOrCreateAssociatedTokenAccount,
} from '@solana/spl-token';


import {
  PublicKey,
  Signer,
  Transaction,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
  PartialSignInstruction,
  sleep
} from '@solana-suite/shared';

import {
  Account as Acc
} from './';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  const RETREY_OVER_LIMIT = 10;
  const RETREY_SLEEP_TIME = 3000;

  export const retryGetOrCreateAssociatedAccountInfo = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    feePayer: Signer,
  ): Promise<Result<Account, Error>> => {
    let counter = 1;
    while (counter < RETREY_OVER_LIMIT) {
      try {
        const accountInfo = await getOrCreateAssociatedTokenAccount(
          Node.getConnection(),
          feePayer,
          tokenKey,
          owner,
          true
        );
        console.debug('# associatedAccountInfo: ', accountInfo.address.toString());
        return Result.ok(accountInfo);
      } catch (e) {
        console.debug(`# retry: ${counter} get or create token account: `, e);
      }
      sleep(RETREY_SLEEP_TIME);
      counter++;
    }
    return Result.err(Error(`retry action is over limit ${RETREY_OVER_LIMIT}`));
  }

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const connection = Node.getConnection();
    const tokenRes = await createMint(
      connection,
      feePayer,
      owner,
      owner,
      mintDecimal
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated = await retryGetOrCreateAssociatedAccountInfo(
      token,
      owner,
      feePayer
    );

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = createMintToCheckedInstruction(
      token,
      tokenAssociated.value.address,
      owner,
      totalAmount,
      mintDecimal,
      signers,
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer,
        token.toBase58()
      )
    );
  }

  export const burn = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    burnAddress: PublicKey,
    signers: Signer[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Signer

  ) => {
    const ownerAccount = await Acc.findAssocaiatedTokenAddress(
      tokenKey,
      owner
    );

    if (ownerAccount.isErr) {
      Result.err(ownerAccount.error);
    }

    const burnAccount = await Acc.findAssocaiatedTokenAddress(
      tokenKey,
      burnAddress
    );

    if (burnAccount.isErr) {
      Result.err(burnAccount.error);
    }

    console.log(burnAccount.unwrap().toBase58())

    const inst = createBurnCheckedInstruction(
      tokenKey,
      burnAccount.unwrap(),
      ownerAccount.unwrap(),
      burnAmount * tokenDecimals ** 10,
      tokenDecimals,
      signers,
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      ));
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

    const sourceToken = await retryGetOrCreateAssociatedAccountInfo(
      tokenKey,
      owner,
      feePayer,
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await retryGetOrCreateAssociatedAccountInfo(
      tokenKey,
      dest,
      feePayer,
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = createTransferCheckedInstruction(
      sourceToken.value.address,
      tokenKey,
      destToken.value.address,
      owner,
      amount * mintDecimal ** 10,
      mintDecimal,
      signers,
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      ));
  }

  export const transferNft = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      tokenKey,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }

  export const feePayerPartialSignTransfer = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer: PublicKey,
  ): Promise<Result<PartialSignInstruction, Error>> => {

    const inst = await transfer(
      tokenKey,
      owner,
      dest,
      signers,
      amount * mintDecimal ** 10,
      mintDecimal,
    );

    if (inst.isErr) {
      return Result.err(inst.error);
    }

    const instruction = inst.value.instructions[0];


    // partially sign transaction
    const blockhashObj = await Node.getConnection().getLatestBlockhash();
    const tx = new Transaction({
      lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
      blockhash: blockhashObj.blockhash,
      feePayer
    }).add(instruction);

    tx.recentBlockhash = blockhashObj.blockhash;
    signers.forEach(signer => {
      tx.partialSign(signer);
    });

    try {
      const sirializedTx = tx.serialize(
        {
          requireAllSignatures: false,
        }
      )
      const hex = sirializedTx.toString('hex');
      return Result.ok(new PartialSignInstruction(hex));
    } catch (ex) {
      return Result.err(ex as Error);
    }
  }
}
