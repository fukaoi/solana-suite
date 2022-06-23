import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createMint,
  createBurnCheckedInstruction,
  createMintToCheckedInstruction,
  createTransferCheckedInstruction,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
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
  sleep,
} from '@solana-suite/shared';

import {
  Account as Acc,
  Account,
  Transaction as LocalTransaction,
} from './';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  const RETREY_OVER_LIMIT = 10;
  const RETREY_SLEEP_TIME = 3;

  export const calcurateAmount = (amount: number, mintDecimal: number): number => {
    return amount * (10 ** mintDecimal);
  }

  export const retryGetOrCreateAssociatedAccountInfo = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Signer,
  ): Promise<Result<string, Error>> => {
    let counter = 1;
    while (counter < RETREY_OVER_LIMIT) {
      try {
        const inst = await Acc.getOrCreateAssociatedTokenAccount(
          mint,
          owner,
          feePayer,
          true,
        );

        if (inst.isOk && typeof inst.value === 'string') {
          console.debug('# associatedTokenAccount: ', inst.value);
          return Result.ok(inst.value);
        }

        return (await inst.submit()).map(
          (ok: string) => {
            LocalTransaction.confirmedSig(ok);
            return (inst.unwrap() as Instruction).data as string;
          },
          (err: Error) => {
            console.debug('# Error submit getOrCreateAssociatedTokenAccount: ', err);
            throw err;
          }
        );
      } catch (e) {
        console.debug(`# retry: ${counter} create token account: `, e);
      }
      await sleep(RETREY_SLEEP_TIME);
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
      tokenAssociated.value.toPublicKey(),
      owner,
      calcurateAmount(totalAmount, mintDecimal),
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
    mint: PublicKey,
    owner: PublicKey,
    signers: Signer[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Signer
  ) => {
    const tokenAccount = await Acc.findAssocaiatedTokenAddress(
      mint,
      owner,
    );

    if (tokenAccount.isErr) {
      return Result.err(tokenAccount.error);
    }

    const inst = createBurnCheckedInstruction(
      tokenAccount.unwrap(),
      mint,
      owner,
      calcurateAmount(burnAmount, tokenDecimals),
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
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const sourceToken = await retryGetOrCreateAssociatedAccountInfo(
      mint,
      owner,
      feePayer,
    );

    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await retryGetOrCreateAssociatedAccountInfo(
      mint,
      dest,
      feePayer,
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = createTransferCheckedInstruction(
      sourceToken.value.toPublicKey(),
      mint,
      destToken.value.toPublicKey(),
      owner,
      calcurateAmount(amount, mintDecimal),
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
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }

  export const feePayerPartialSignTransfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer: PublicKey,
  ): Promise<Result<PartialSignInstruction, Error>> => {

    const sourceToken = await Account.getOrCreateAssociatedTokenAccountInstruction(
      mint,
      owner,
      feePayer
    );

    const destToken = await Account.getOrCreateAssociatedTokenAccountInstruction(
      mint,
      dest,
      feePayer
    );

    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    let inst2;
    const blockhashObj = await Node.getConnection().getLatestBlockhash();

    const tx = new Transaction({
      lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
      blockhash: blockhashObj.blockhash,
      feePayer
    });

    // return associated token account
    if (!destToken.value.inst) {
      inst2 = createTransferCheckedInstruction(
        (sourceToken.unwrap().tokenAccount).toPublicKey(),
        mint,
        destToken.value.tokenAccount.toPublicKey(),
        owner,
        calcurateAmount(amount, mintDecimal),
        mintDecimal,
        signers,
      );
      tx.add(inst2);

    } else {
      // return instruction and undecided associated token account
      inst2 = createTransferCheckedInstruction(
        (sourceToken.unwrap().tokenAccount).toPublicKey(),
        mint,
        destToken.value.tokenAccount.toPublicKey(),
        owner,
        calcurateAmount(amount, mintDecimal),
        mintDecimal,
        signers,
      );
      tx.add(destToken.value.inst).add(inst2);
    }

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

  export const feePayerPartialSignTransferNft = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer: PublicKey,
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }
}
