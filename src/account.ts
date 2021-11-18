import {ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction, Constants, Node, Result} from './';

export type Pubkey = string;
export type Secret = string;

export class KeypairStr {
  pubkey: Pubkey;
  secret: Secret;

  constructor(
    pubkey: Pubkey,
    secret: Secret
  ) {
    this.pubkey = pubkey;
    this.secret = secret;
  }

  toPubkey(): PublicKey {
    return new PublicKey(this.pubkey);
  }

  toKeypair(): Keypair {
    const decoded = bs.decode(this.secret);
    return Keypair.fromSecretKey(decoded);
  }
}

export class String {
  get toPubKey(): PublicKey {
    return new PublicKey(this);
  };
}

export namespace Account {
  type Unit = 'sol' | 'lamports';

  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;
  export const MAX_AIRDROP_SOL = LAMPORTS_PER_SOL * 5;

  export const getBalance = async (
    pubkey: PublicKey,
    unit: Unit = 'sol'
  ): Promise<Result<number, Error>> => {
    const balance = await Node.getConnection().getBalance(pubkey)
      .then(Result.ok)
      .catch(Result.err);

    if (balance.isErr) {
      return balance;
    }

    switch (unit) {
      case 'sol': return Result.ok((balance.value) / LAMPORTS_PER_SOL);
      case 'lamports': return balance;
      default: return Result.err(Error('no match unit'));
    }
  };

  export const requestAirdrop = async (
    pubkey: PublicKey,
    airdropAmount?: number
  ): Promise<Result<string, Error>> => {
    console.debug('Now airdropping...please wait');

    airdropAmount = !airdropAmount ? DEFAULT_AIRDROP_AMOUNT : airdropAmount * LAMPORTS_PER_SOL;

    if (airdropAmount > MAX_AIRDROP_SOL) {
      return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`))
    }

    const sig = await Node.getConnection().requestAirdrop(pubkey, airdropAmount)
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(Error('Failed airdrop'));
    }
    await Transaction.confirmedSig(sig.value);
    return Result.ok('success');
  }

  export const create = (): KeypairStr => {
    const keypair = Keypair.generate();
    return new KeypairStr(
      keypair.publicKey.toBase58(),
      bs.encode(keypair.secretKey)
    );
  };

  export const findAssocaiatedTokenAddress = async (
    owner: PublicKey,
    tokenKey: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [
        owner.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        tokenKey.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
      .then(v => Result.ok(v[0]))
      .catch(Result.err);
  }

  export const findMetaplexAssocaiatedTokenAddress = async (
    tokenKey: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [
        Buffer.from('metadata'),
        Constants.METAPLEX_PROGRAM_ID.toBuffer(),
        tokenKey.toBuffer(),
      ],
      Constants.METAPLEX_PROGRAM_ID,
    )
      .then(v => Result.ok(v[0]))
      .catch((e: Error) => Result.err(e))
  }
}
