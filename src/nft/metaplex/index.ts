import {
  Token,
  MintLayout,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram, TransactionInstruction,
} from '@solana/web3.js';

import {Node, Transaction, Result, Append} from '../../';
import {MetaplexMetaData, MetaplexInstructure} from './';

export * from './instructure';
export * from './metadata';
export * from './serialize';

export namespace Metaplex {

  const createMintAccount = async (
    instructions: TransactionInstruction[],
    payer: PublicKey,
    signers: Keypair[],
  ) => {
    const mintRentExempt =
      await Node.getConnection().getMinimumBalanceForRentExemption(
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
    payer: PublicKey,
    owner = payer,
    freezeAuthority = payer
  ) => {
    const decimals: number = 0;

    instructions.push(
      Token.createInitMintInstruction(
        TOKEN_PROGRAM_ID,
        mintAccount,
        decimals,
        owner,
        freezeAuthority,
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

  export interface MintResult {
    tokenKey: string,
    signature: string
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
    payer: PublicKey,
    signers: Keypair[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const mintAccount = await createMintAccount(
      inst,
      payer,
      signers,
    );

    const tokenKey = await init(
      inst,
      mintAccount,
      payer,
    );

    return {instructions: inst, signers, tokenKey};
  }

  export const mint2 = (
    data: MetaplexInstructure.Data,
    owner: PublicKey,
    signers: Keypair[],
  ) => async (append?: Append.Value)
      : Promise<Result<MintResult, Error>> => {
      const txsign = await create(owner, signers)();

      const metadataInst = await MetaplexMetaData.create(
        data,
        txsign.tokenKey.toPubKey(),
        owner,
      )(txsign.instructions);

      if (metadataInst.isErr) return Result.err(metadataInst.error);

      const updateTx = await MetaplexMetaData.update(
        data,
        undefined,
        undefined,
        txsign.tokenKey.toPubKey(),
        owner,
        signers,
      )(metadataInst.value as TransactionInstruction[]);

      if (updateTx.isErr) return Result.err(updateTx.error);

      const signature = await Transaction.sendInstruction(txsign.signers)
        ({
          txInstructions: updateTx.value as TransactionInstruction[]
        });

      if (signature.isErr) return Result.err(signature.error);

      return Result.ok(
        {
          tokenKey: txsign.tokenKey,
          signature: signature.value
        }
      );
    }

  export const mint = async (
    data: MetaplexInstructure.Data,
    owner: Keypair,
  ): Promise<Result<MintResult, Error>> => {
    const txsign = await create(owner.publicKey, [owner])();

    const metadataInst = await MetaplexMetaData.create(
      data,
      txsign.tokenKey.toPubKey(),
      owner.publicKey,
    )(txsign.instructions);

    if (metadataInst.isErr) return Result.err(metadataInst.error);

    const updateTx = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      txsign.tokenKey.toPubKey(),
      owner.publicKey,
      [owner],
    )(metadataInst.value as TransactionInstruction[]);

    if (updateTx.isErr) return Result.err(updateTx.error);

    const signature = await Transaction.sendInstruction(txsign.signers)
      ({
        txInstructions: updateTx.value as TransactionInstruction[]
      });

    if (signature.isErr) return Result.err(signature.error);

    return Result.ok(
      {
        tokenKey: txsign.tokenKey,
        signature: signature.value
      }
    );
  }
}
