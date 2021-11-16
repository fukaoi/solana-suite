import {
  Token,
  MintLayout,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';
import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  Signer,
  Keypair,
} from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
} from '../../';

import {
  MetaplexMetaData,
  MetaplexInstructure
} from './';

export * from './instructure';
export * from './metadata';
export * from './serialize';

export namespace Metaplex {

  const createMintAccount = async (
    instructions: TransactionInstruction[],
    payer: PublicKey,
    signers: Signer[],
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

  export const create = async (
    payer: PublicKey,
    signers: Signer[],
    instructions?: TransactionInstruction[]
  ) => {
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

  export const mint = async (
    data: MetaplexInstructure.Data,
    owner: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    feePayer = feePayer ? feePayer : signers[0];
    const txsign = await create(feePayer.publicKey, [signers[0]]);

    const metadataInst = await MetaplexMetaData.create(
      data,
      txsign.tokenKey.toPubkey(),
      feePayer.publicKey,
      owner,
      owner,
      txsign.instructions,
    );

    if (metadataInst.isErr){ 
      return Result.err(metadataInst.error);
    }

    signers = signers.concat(txsign.signers);

    return Result.ok(
      new Instruction(
        metadataInst.value,
        signers,
        feePayer,
        txsign.tokenKey,
      ));
  }
}
