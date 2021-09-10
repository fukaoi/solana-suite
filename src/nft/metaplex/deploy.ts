import {Token, MintLayout} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram, TransactionInstruction,
} from '@solana/web3.js';
import {Constants} from '../../constants';
import {Util} from '../../util';
import {MetaplexObject} from './object';
import {MetaplexMetaData} from './metadata';

export namespace MetaplexDeploy {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);

  const createMintAccount = async (
    instructions: TransactionInstruction[],
    payer: PublicKey,
    signers: Keypair[],
  ) => {
    const mintRentExempt = await Util.getConnection().getMinimumBalanceForRentExemption(
      MintLayout.span,
    );
    const mintAccount = Keypair.generate();
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: payer,
        newAccountPubkey: mintAccount.publicKey,
        lamports: mintRentExempt,
        space: MintLayout.span,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    signers.push(mintAccount);
    return mintAccount.publicKey;
  }

  const init = async (
    instructions: TransactionInstruction[],
    mintAccount: PublicKey,
    payer: string,
    owner = payer,
    freezeAuthority = payer
  ) => {
    const decimals: number = 0;

    instructions.push(
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mintAccount,
        decimals,
        new PublicKey(owner),
        new PublicKey(freezeAuthority),
      ),
    );
    return mintAccount.toBase58();
  }

  export const create = (
    data: MetaplexObject.Data,
    payer: string,
    signerSecrets: string[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const signers = signerSecrets.map(s => Util.createKeypair(s));

    const mintAccount = await createMintAccount(
      inst,
      new PublicKey(payer),
      signers,
    );

    const mintKey = await init(
      inst,
      mintAccount,
      payer,
    );

    const insts = await MetaplexMetaData.create(data, mintKey, payer, inst);

    return {instructions: insts, signers, mintKey};
  }
}
