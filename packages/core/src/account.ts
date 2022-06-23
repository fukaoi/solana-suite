import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

import {
  Keypair,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  PublicKey,
  RpcResponseAndContext,
  TokenAmount,
  Signer,
  TransactionInstruction,
} from '@solana/web3.js';

import bs from 'bs58';

import {Transaction} from './';
import {Instruction, Node, Result} from '@solana-suite/shared';

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
    lamports: number,
    owner: string,
    rentEpoch: number
  }

  export interface TokenAccountInfo {
    mint: string,
    owner: string,
    tokenAmount: number
  }

  export interface TokenInfoOwned {
    mint: string,
    tokenAmount: number,
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
      return Result.ok({
        mint: data.parsed.info.mint,
        owner: data.parsed.info.owner,
        tokenAmount: data.parsed.info.tokenAmount.uiAmount
      } as TokenAccountInfo);
    } else {
      // native address publicKey
      return Result.ok({
        lamports: accountInfo.value.value?.lamports,
        owner: accountInfo.value.value?.owner.toString(),
        rentEpoch: accountInfo.value.value?.rentEpoch
      } as AccountInfo);
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
    mint: PublicKey,
  ): Promise<Result<TokenAmount, Error>> => {
    const res = await findAssocaiatedTokenAddress(mint, pubkey);
    if (res.isErr) {
      return Result.err(res.error);
    }
    return await Node.getConnection().getTokenAccountBalance(res.unwrap())
      .then((rpc: RpcResponseAndContext<TokenAmount>) => Result.ok(rpc.value))
      .catch(Result.err);
  };

  export const getTokenInfoOwned = async (
    pubkey: PublicKey,
  ): Promise<Result<TokenInfoOwned[], Error>> => {
    const res = await Node.getConnection().getParsedTokenAccountsByOwner(
      pubkey,
      {
        programId: TOKEN_PROGRAM_ID
      }
    ).then(Result.ok)
      .catch(Result.err);

    if (res.isErr) {
      return Result.err(res.error);
    }

    const modified = res.unwrap().value.map(d => {
      return {
        mint: d.account.data.parsed.info.mint,
        tokenAmount: d.account.data.parsed.info.tokenAmount.uiAmount
      }
    });

    return Result.ok(modified);
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

    const sig = await Node.getConnection().requestAirdrop(
      pubkey,
      airdropAmount
    )
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(Error(`Failed airdrop. ${sig.error.message}`));
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
    mint: PublicKey,
    owner: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [
        owner.toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
      .then(v => Result.ok(v[0]))
      .catch(Result.err);
  }

  export const getOrCreateAssociatedTokenAccountInstruction = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: PublicKey,
    allowOwnerOffCurve = false,
  ): Promise<Result<{tokenAccount: string, inst: TransactionInstruction | undefined}, Error>> => {
    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.err);

    if (associatedToken.isErr) {
      return associatedToken.error;
    }


    const associatedTokenAccount = associatedToken.unwrap();
    console.debug('# associatedTokenAccount: ', associatedTokenAccount.toString());

    try {
      // Dont use Result
      await getAccount(
        Node.getConnection(),
        associatedTokenAccount,
        Node.getConnection().commitment,
        TOKEN_PROGRAM_ID
      )
      return Result.ok(
        {
          tokenAccount: associatedTokenAccount.toString(),
          inst: undefined
        }
      );
    } catch (error: unknown) {
      if (!(error instanceof TokenAccountNotFoundError)
        && !(error instanceof TokenInvalidAccountOwnerError)) {
        return Result.err(Error('Unexpected error'));
      }

      const inst =
        createAssociatedTokenAccountInstruction(
          feePayer,
          associatedTokenAccount,
          owner,
          mint,
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID
        );

      return Result.ok(
        {
          tokenAccount: associatedTokenAccount.toString(),
          inst
        }
      );
    }
  }

  export const getOrCreateAssociatedTokenAccount = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Signer,
    allowOwnerOffCurve = false,
  ): Promise<Result<string | Instruction, Error>> => {

    const res = await getOrCreateAssociatedTokenAccountInstruction(
      mint,
      owner,
      feePayer.publicKey,
      allowOwnerOffCurve,
    );

    if (res.isErr) {
      return Result.err(res.error);
    }

    if (!res.value.inst) {
      return Result.ok(res.value.tokenAccount);
    }

    return Result.ok(
      new Instruction(
        [res.value.inst],
        [],
        feePayer,
        res.value.tokenAccount
      )
    );
  }
}
