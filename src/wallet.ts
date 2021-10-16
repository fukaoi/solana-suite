import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import bs from 'bs58';

import {Node} from './node';
import {Constants} from './constants';
import {Transaction} from './transaction';
import { tryCatch, either } from 'rambda';

export namespace Wallet {

  type Unit = 'sol' | 'lamports';

  export interface KeyPair {
    pubkey: string,
    secret: string
  }

  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;

  // export const getBalance = async (pubkey: PublicKey, unit: Unit = 'sol'): Promise<number> => {
  export const getBalance = async (pubkey: PublicKey, unit: Unit = 'sol') => {

    // try {
    const res = await tryCatch(
      () => Node.getConnection().getBalance('test'.toPubKey()),
      (e: any) => e.message
    )(pubkey);
      console.log('res:', res);
     // await Node.getConnection().getBalance('test'.toPubKey());

    // } catch (e: any) {
      // console.log(e.message);
    // }
    // // switch (unit) {
      // case 'sol': return balance / LAMPORTS_PER_SOL;
      // case 'lamports': return balance;
      // default: throw new Error('no match unit');
    // }
  };

  export const requestAirdrop = async (pubkey: PublicKey, airdropAmount: number = DEFAULT_AIRDROP_AMOUNT) => {
    console.debug('Now airdropping...please wait');
    const sig = await Node.getConnection().requestAirdrop(pubkey, airdropAmount);
    await Transaction.confirmedSig(sig);
  }

  export const create = async (): Promise<KeyPair> => {
    const keypair = Keypair.generate();
    return {
      pubkey: keypair.publicKey.toBase58(),
      secret: bs.encode(keypair.secretKey)
    };
  };

  export const findAssocaiatedTokenAddress = async (
    source: PublicKey,
    tokenKey: PublicKey
  ): Promise<PublicKey> => {
    return (await PublicKey.findProgramAddress(
      [
        source.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenKey.toBuffer(),
      ],
      Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];
  }

  export const findMetaplexAssocaiatedTokenAddress = async (
    tokenKey: PublicKey
  ): Promise<PublicKey> => {
    return (await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        Constants.METAPLEX_PROGRAM_ID.toBuffer(),
        tokenKey.toBuffer(),
      ],
      Constants.METAPLEX_PROGRAM_ID,
    ))[0];
  }

  export const createAssociatedTokenAccountInstruction = (
    associatedToken: PublicKey,
    payer: PublicKey,
    source: PublicKey,
    mintKey: PublicKey,
  ) => {
    const keys = [
      {
        pubkey: payer,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: associatedToken,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: source,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: mintKey,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: TOKEN_PROGRAM_ID,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: SYSVAR_RENT_PUBKEY,
        isSigner: false,
        isWritable: false,
      },
    ];
    return new TransactionInstruction({
      keys,
      programId: Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID,
      data: Buffer.from([]),
    });
  }
}
