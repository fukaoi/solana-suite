import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

import {
  Keypair,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
  TokenAmount,
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction} from './';
import {Node, Result} from '@solana-suite/shared';

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

  toPublicKey(): PublicKey {
    return new PublicKey(this.pubkey);
  }

  toKeypair(): Keypair {
    const decoded = bs.decode(this.secret);
    return Keypair.fromSecretKey(decoded);
  }
}

export namespace Account {
  type Unit = 'sol' | 'lamports';

  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;
  export const MAX_AIRDROP_SOL = LAMPORTS_PER_SOL * 5;

  export interface AccountInfo {
    data: any,
    executable: boolean,
    lamports: number,
    owner: PublicKey,
    rentEpoch: 255
  }

  export interface TokenAccountInfo {
    mint: string,
    owner: string,
    state: string,
    tokenAmount: {
      amount: string,
      decimals: number,
      uiAmount: number,
      uiAmountStirng: string
    }
  }

  export const getInfo = async (
    pubkey: PublicKey,
  ): Promise<Result<AccountInfo | TokenAccountInfo, Error>> => {
    const accountInfo = await Node.getConnection().getParsedAccountInfo(pubkey)
      .then(Result.ok)
      .catch(Result.err);

    if (accountInfo.isErr) {
      return Result.err(accountInfo.error);
    }
    const data = (accountInfo?.value?.value?.data) as ParsedAccountData;
    if (!data) {
      // invalid pubkey
      return Result.err(Error('Not found publicKey. invalid data'));
    } else if (data.parsed) {
      // token account publicKey
      return Result.ok(data.parsed.info as TokenAccountInfo);
    } else {
      // native address publicKey
      return Result.ok(accountInfo.value.value as AccountInfo);
    }
  }

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

  export const getTokenBalance = async (
    pubkey: PublicKey,
    tokenKey: PublicKey,
  ): Promise<Result<TokenAmount, Error>> => {
    const res = await findAssocaiatedTokenAddress(tokenKey, pubkey);
    if (res.isErr) {
      return Result.err(res.error);
    }
    return await Node.getConnection().getTokenAccountBalance(res.unwrap())
      .then((rpc: RpcResponseAndContext<TokenAmount>) => Result.ok(rpc.value))
      .catch(Result.err);
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
      keypair.publicKey.toBase58() as Pubkey,
      bs.encode(keypair.secretKey) as Secret
    );
  };

  export const findAssocaiatedTokenAddress = async (
    tokenKey: PublicKey,
    owner: PublicKey
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
}
