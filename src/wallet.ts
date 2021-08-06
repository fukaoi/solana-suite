import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import {TOKEN_PROGRAM_ID} from '@solana/spl-token';
import bs from 'bs58';

import {Util} from './util';
import {Constants} from './constants';

export namespace Wallet {

  type Unit = 'sol' | 'lamports';

  export interface Keypair {
    pubkey: string,
    secret: string
  }

  const ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(Constants.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 10;

  export const getBalance = async (pubkey: string, unit: Unit = 'sol'): Promise<number> => {
    const balance = await Util.getConnection().getBalance(new PublicKey(pubkey));
    switch (unit) {
      case 'sol': return balance / LAMPORTS_PER_SOL;
      case 'lamports': return balance;
      default: throw new Error('no match unit');
    }
  };

  export const create = async (): Promise<Keypair> => {
    const keypair = Keypair.generate();
    if (process.env.NODE_ENV !== 'production') {
      await Util.getConnection().requestAirdrop(keypair.publicKey, DEFAULT_AIRDROP_AMOUNT);
      await Util.sleep(20);
    }
    return {
      pubkey: keypair.publicKey.toBase58(),
      secret: bs.encode(keypair.secretKey)
    };
  };

  export const findAssocaiatedTokenAddress = async (
    walletStr: string,
    tokenIdStr: string
  ): Promise<PublicKey> => {
    const walletPubKey = new PublicKey(walletStr);
    const tokenId = new PublicKey(tokenIdStr);
    return (await PublicKey.findProgramAddress(
      [
        walletPubKey.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenId.toBuffer(),
      ],
      ACCOUNT_PROGRAM_ID
    ))[0];
  }
}
