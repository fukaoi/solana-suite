import {Token, MintLayout} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {Constants} from '../../constants';
import {Util} from '../../util';
import {Wallet} from '../../wallet';

export namespace MetaplexMint {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);

  const createUninitializedMint = (
    instructions: TransactionInstruction[],
    payer: PublicKey,
    amount: number,
    signers: Keypair[],
  ) => {
    const account = Keypair.generate();
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: account.publicKey,
        lamports: amount,
        space: MintLayout.span,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    signers.push(account);
    return account.publicKey;
  }

  const init = async (
    instructions: TransactionInstruction[],
    payer: string,
    signers: Keypair[],
    owner = payer,
    freezeAuthority = payer
  ) => {
    const decimals: number = 0;
    const mintRentExempt = await Util.getConnection().getMinimumBalanceForRentExemption(
      MintLayout.span,
    );

    const account = createUninitializedMint(
      instructions,
      new PublicKey(payer),
      mintRentExempt,
      signers,
    );

    instructions.push(
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        account,
        decimals,
        new PublicKey(owner),
        new PublicKey(freezeAuthority),
      ),
    );
    return account.toBase58();
  }

  const createDestination = async (
    instructions: TransactionInstruction[],
    payer: string,
    mintKey: string,
  ) => {
    const recipientKey = await Wallet.findAssocaiatedTokenAddress(
      payer,
      mintKey
    );

    const tx = Wallet.createAssociatedTokenAccountInstruction(
      recipientKey.toBase58(),
      payer,
      payer,
      mintKey,
    );
    instructions.push(tx);
    return recipientKey;
  }

  export const create = async (
    payer: string,
    signerSecrets: string[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const signers = signerSecrets.map(s => Util.createKeypair(s));

    const mintKey = await init(
      inst,
      payer,
      signers,
    );

    await createDestination(
      inst,
      payer,
      mintKey,
    );
    return {instructions: inst, signers: signers};
  }
}
