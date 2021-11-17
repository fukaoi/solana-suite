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
  Instruction,
  Result,
} from '../../';

import {
  MetaplexInstructure
} from './';
import {MetaplexMetaData} from './metadata';

export * from './instructure';
export * from './metadata';
export * from './serialize';

export namespace MetaplexInstruction {
  export const mintAccount = async (
    instructions: TransactionInstruction[],
    owner: PublicKey, // need sufficient sol account
    signers: Signer[],
  ) => {
    const mintRentExempt =
      await Node.getConnection().getMinimumBalanceForRentExemption(
        MintLayout.span,
      );
    const mintAccount = Keypair.generate();
    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: mintAccount.publicKey,
        lamports: mintRentExempt,
        space: MintLayout.span,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    signers.push(mintAccount);

    return {
      mintAccount: mintAccount.publicKey,
      signers
    };
  }

  export const mint = async (
    instructions: TransactionInstruction[],
    mintAccount: PublicKey,
    owner: PublicKey,
    freezeAuthority: PublicKey,
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
}

export namespace Metaplex {

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

  export const initializeMint = async (
    payer: PublicKey,
    signers: Signer[],
  ): Promise<{
    instructions: TransactionInstruction[],
    signers: Signer[],
    tokenKey: string
  }> => {
    const instructions: TransactionInstruction[] = [];

    const inst1 = await MetaplexInstruction.mintAccount(
      instructions,
      payer,
      signers,
    );

    signers = signers.concat(inst1.signers);

    const tokenKey = await MetaplexInstruction.mint(
      instructions,
      inst1.mintAccount,
      payer,
      payer,
    );

    return {
      instructions,
      signers,
      tokenKey
    };
  }

  export const mint = async (
    data: MetaplexInstructure.Data,
    owner: PublicKey,
    signers: Signer[],
  ): Promise<Result<Instruction, Error>> => {
    const inst1 = await initializeMint(owner, signers);

    signers = signers.concat(inst1.signers);


    const inst2 = await MetaplexMetaData.create(
      data,
      inst1.tokenKey.toPubkey(),
      owner,
      owner,
      owner,
    );

    if (inst2.isErr) {
      return Result.err(inst2.error);
    }

    const inst3 = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      inst1.tokenKey.toPubkey(),
      owner,
      signers,
    );

    if (inst3.isErr) return Result.err(inst3.error);

    const mergeInstructions = inst1.instructions.concat(inst2.unwrap()).concat(inst3.unwrap());

    return Result.ok(
      new Instruction(
        mergeInstructions,
        signers,
        undefined,
        inst1.tokenKey,
      ));
  }
}
