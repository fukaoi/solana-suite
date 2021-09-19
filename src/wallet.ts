import {
  Keypair as K,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import bs from 'bs58';

import {Util} from './util';
import {Constants} from './constants';

export namespace Wallet {
  const TOKEN_ASSOCIATED_PROGRAM_ID = new PublicKey(Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);

  type Unit = 'sol' | 'lamports';

  export interface Keypair {
    pubkey: string,
    secret: string
  }

  const ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(Constants.SPL_ASSOCIATED_TOKEN_PROGRAM_ID);
  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;

  export const getBalance = async (pubkey: string, unit: Unit = 'sol'): Promise<number> => {
    const balance = await Util.getConnection().getBalance(new PublicKey(pubkey));
    switch (unit) {
      case 'sol': return balance / LAMPORTS_PER_SOL;
      case 'lamports': return balance;
      default: throw new Error('no match unit');
    }
  };

  export const create = async (): Promise<Keypair> => {
    const keypair = K.generate();
    if (process.env.NODE_ENV !== 'production') {
      await Util.getConnection().requestAirdrop(keypair.publicKey, DEFAULT_AIRDROP_AMOUNT);
      console.log('Now airdropping...please wait');
      await Util.sleep(20);
    }
    return {
      pubkey: keypair.publicKey.toBase58(),
      secret: bs.encode(keypair.secretKey)
    };
  };

  export const findAssocaiatedTokenAddress = async (
    sourcePubkey: string,
    tokenId: string
  ): Promise<PublicKey> => {
    const walletPubKey = new PublicKey(sourcePubkey);
    const tokenIdPublicKey = new PublicKey(tokenId);
    return (await PublicKey.findProgramAddress(
      [
        walletPubKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenIdPublicKey.toBuffer(),
      ],
      ACCOUNT_PROGRAM_ID
    ))[0];
  }

  export const findMetaplexAssocaiatedTokenAddress = async (
    tokenId: string
  ): Promise<PublicKey> => {
    const tokenIdPublicKey = new PublicKey(tokenId);
    return (await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        new PublicKey(METADATA_PROGRAM_ID).toBuffer(),
        tokenIdPublicKey.toBuffer(),
      ],
      new PublicKey(METADATA_PROGRAM_ID),
    ))[0];
  }

  export const createAssociatedTokenAccountInstruction = (
    associatedTokenAddress: string,
    payer: string,
    sourcePubkey: string,
    mintKey: string,
  ) => {
    const keys = [
      {
        pubkey: new PublicKey(payer),
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: new PublicKey(associatedTokenAddress),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: new PublicKey(sourcePubkey),
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: new PublicKey(mintKey),
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
      programId: TOKEN_ASSOCIATED_PROGRAM_ID,
      data: Buffer.from([]),
    });
  }
}
