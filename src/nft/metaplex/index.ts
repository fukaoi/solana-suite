import {Token, MintLayout} from '@solana/spl-token';
import {Transaction} from '../../transaction';
import {
  Keypair,
  PublicKey,
  SystemProgram, TransactionInstruction,
} from '@solana/web3.js';

import {Constants} from '../../constants';
import {Util} from '../../util';
import {MetaplexMetaData} from './metadata';
import {MetaplexInstructure} from './instructure';
import {Wallet} from '../../wallet';

export * from './instructure';
export * from './metadata';
export * from './serialize';

export namespace Metaplex {
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

  // tslint:disable-next-line
  export interface Creators {}

  export interface Format {
    name: string,
    uri: string,
    symbol: string,
    update_authority: string,
    creators?: Creators[],
    seller_fee_basis_points?: number,
    primary_sale_happened?: boolean,
  }

  export const initFormat = (): Format => {
    return {
      name: '',
      uri: '',
      symbol: '',
      update_authority: '',
      creators: [],
      seller_fee_basis_points: 0,
      primary_sale_happened: false
    }
  }

  export const create = (
    payer: string,
    signerSecrets: string[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const signers = signerSecrets.map(s => Wallet.createKeypair(s));

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

    return {instructions: inst, signers, mintKey};
  }

  export const mint = async (
    data: MetaplexInstructure.Data,
    owner: {pubkey: string, secret: string},
  ): Promise<{mintKey: string, signature: string}> => {
    const txsign = await create(owner.pubkey, [owner.secret])();

    const metadataInst = await MetaplexMetaData.create(
      data,
      txsign.mintKey,
      owner.pubkey,
    )(txsign.instructions);

    const updateTx = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      txsign.mintKey,
      owner.pubkey,
      [owner.secret],
    )(metadataInst);

    const signature = await Transaction.sendInstructions(
      txsign.signers,
      updateTx
    );

    return {mintKey: txsign.mintKey, signature};
  }
}
