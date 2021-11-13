import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction, Constants, Node, Result, u64} from './';
import {AccountInstruction} from './instructions/account';

// TODO: want rename Wallet to Account
export namespace Wallet {

  type Unit = 'sol' | 'lamports';

  export interface KeypairStr {
    pubkey: string,
    secret: string
  }

  export const DEFAULT_AIRDROP_AMOUNT = LAMPORTS_PER_SOL * 1;
  export const MAX_AIRDROP_SOL = LAMPORTS_PER_SOL * 5;

  export const getBalance = async (
    pubkey: PublicKey,
    unit: Unit = 'sol'
  ): Promise<Result<number, Error>> => {
    const balance = await Node.getConnection().getBalance(pubkey)
      .then(Result.ok)
      .catch(Result.err);

    if (balance.isErr) return balance;

    switch (unit) {
      case 'sol': return Result.ok((balance.value) / LAMPORTS_PER_SOL);
      case 'lamports': return balance;
      default: return Result.err(Error('no match unit'));
    }
  };

  export const requestAirdrop = async (
    pubkey: PublicKey,
    airdropAmount: number = DEFAULT_AIRDROP_AMOUNT
  ): Promise<Result<string, Error>> => {
    console.debug('Now airdropping...please wait');

    if (airdropAmount > MAX_AIRDROP_SOL)
      return Result.err(Error(`Over max airdrop amount: ${airdropAmount}`))

    const sig = await Node.getConnection().requestAirdrop(pubkey, airdropAmount)
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) return Result.err(Error('Failed airdrop'));
    await Transaction.confirmedSig(sig.value);
    return Result.ok('success');
  }

  export const create = (): KeypairStr => {
    const keypair = Keypair.generate();
    return {
      pubkey: keypair.publicKey.toBase58(),
      secret: bs.encode(keypair.secretKey)
    };
  };

  export const findAssocaiatedTokenAddress = async (
    owner: PublicKey,
    tokenKey: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [
        owner.toBuffer(),
        Constants.TOKEN_PROGRAM_ID.toBuffer(),
        tokenKey.toBuffer(),
      ],
      Constants.ASSOCIATED_TOKEN_PROGRAM_ID
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

  export const getAssociatedTokenAddress = async (
    mint: PublicKey,
    owner: PublicKey,
    allowOwnerOffCurve: boolean = false,
  ): Promise<Result<PublicKey, Error>> => {
    if (!allowOwnerOffCurve && !PublicKey.isOnCurve(owner.toBuffer())) {
      Result.err(Error(`Owner cannot sign: ${owner.toString()}`));
    }
    const address = (
      await PublicKey.findProgramAddress(
        [
          owner.toBuffer(),
          Constants.TOKEN_PROGRAM_ID.toBuffer(),
          mint.toBuffer()
        ],
        Constants.ASSOCIATED_TOKEN_PROGRAM_ID,
      )
    )[0];
    return Result.ok(address);
  }

  export const getInfo = async(
    account: PublicKey,
    tokenKey: PublicKey,
  ) => {
    const info = await Node.getConnection().getAccountInfo(account);
    if (info === null) {
      return Result.err(Error('Failed to find account'));
    }

    if (!info.owner.equals(Constants.TOKEN_PROGRAM_ID)) {
      return Result.err(Error('Invalid account owner'));
    }
    if (info.data.length != AccountInstruction.Layout.span) {
      return Result.err(Error(`Invalid account size`));
    }

    const data = Buffer.from(info.data);
    const accountInfo = AccountInstruction.Layout.decode(data);
    accountInfo.address = account;
    accountInfo.mint = new PublicKey(accountInfo.mint);
    accountInfo.owner = new PublicKey(accountInfo.owner);
    accountInfo.amount = u64.fromBuffer(accountInfo.amount);

    if (accountInfo.delegateOption === 0) {
      accountInfo.delegate = null;
      accountInfo.delegatedAmount = new u64([]);
    } else {
      accountInfo.delegate = new PublicKey(accountInfo.delegate);
      accountInfo.delegatedAmount = u64.fromBuffer(accountInfo.delegatedAmount);
    }

    accountInfo.isInitialized = accountInfo.state !== 0;
    accountInfo.isFrozen = accountInfo.state === 2;

    if (accountInfo.isNativeOption === 1) {
      accountInfo.rentExemptReserve = u64.fromBuffer(accountInfo.isNative);
      accountInfo.isNative = true;
    } else {
      accountInfo.rentExemptReserve = null;
      accountInfo.isNative = false;
    }

    if (accountInfo.closeAuthorityOption === 0) {
      accountInfo.closeAuthority = null;
    } else {
      accountInfo.closeAuthority = new PublicKey(accountInfo.closeAuthority);
    }

    if (!accountInfo.mint.equals(tokenKey)) {
      Result.err(Error(
        `Invalid account mint: ${JSON.stringify(
          accountInfo.mint,
        )} !== ${JSON.stringify(tokenKey)}`,
      ));
    }
    return accountInfo;
  }
}
