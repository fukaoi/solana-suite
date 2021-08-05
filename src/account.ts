import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import {TOKEN_PROGRAM_ID} from '@solana/spl-token';

import {Util} from './util';
import {Constants} from './constants';

export namespace Account {

  type Unit = 'sol' | 'lamports';

  const ACCOUNT_PROGRAM_ID: PublicKey = new PublicKey(Constants.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 10;

  export const getBalance = async (pubkey: PublicKey, unit: Unit = 'sol'): Promise<number> => {
    const balance = await Util.getConnection().getBalance(pubkey);
    switch (unit) {
      case 'sol': return balance / LAMPORTS_PER_SOL;
      case 'lamports': return balance;
      default: throw new Error('no match unit');
    }
  };

  export const createAccount = async (): Promise<Keypair> => {
    const keypair = Keypair.generate();
    await Util.getConnection().requestAirdrop(keypair.publicKey, DEFAULT_AIRDROP_AMOUNT);
    await Util.sleep(15);
    return keypair;
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
