import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Keypair,
  RpcResponseAndContext,
  AccountInfo,
  ParsedAccountData
} from '@solana/web3.js';

import {Metaplex, MetaplexSerialize, MetaplexInstructure} from './index';
import {Node, Wallet, Constants} from '../../index';
import {Token} from '@solana/spl-token';
import {Result} from '@badrap/result';

export namespace MetaplexMetaData {
  export const getByTokenKey = async (tokenKey: PublicKey):
    Promise<Result<Metaplex.Format, Error>> => {
    const metaAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);

    if (metaAccount.isErr) return Result.err(metaAccount.error);

    const nfts = await Node.getConnection().getParsedAccountInfo(
      metaAccount.value as PublicKey
    )
      .then(Result.ok)
      .catch(Result.err);

    if (nfts.isErr) return Result.err(nfts.error);

    const accountData = nfts.value as RpcResponseAndContext<AccountInfo<Buffer>>;
    const data = accountData.value?.data;

    if (data) {
      return Result.ok(MetaplexSerialize.decode(data));
    }
    return Result.ok(Metaplex.initFormat());
  }

  export const getByOwner = async (owner: PublicKey):
    Promise<Result<Metaplex.Format[], Error>> => {
    // Get all token by owner
    const tokens = await Node.getConnection().getParsedTokenAccountsByOwner(
      owner,
      {programId: Constants.SPL_TOKEN_PROGRAM_ID}
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokens.isErr) return Result.err(tokens.error);
    const arr = tokens.value as RpcResponseAndContext<{pubkey: PublicKey; account: AccountInfo<ParsedAccountData>}[]>;

    const matches = [];
    // Filter only metaplex nft
    for (const token of arr.value) {
      const decoded = await getByTokenKey(
        token.account.data.parsed.info.mint.toPubKey()
      );
      if (!decoded) continue;
      if (decoded.isErr) return Result.err(decoded.error);
      matches.push(decoded.value)
    }
    return Result.ok(matches);
  }

  export const create = (
    data: MetaplexInstructure.Data,
    tokenKey: PublicKey,
    payer: PublicKey,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]):
      Promise<Result<PublicKey | TransactionInstruction[], Error>> => {
      let inst: TransactionInstruction[] = [];
      inst = instructions ? instructions : inst;
      const metaAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);
      if (metaAccount.isErr) return metaAccount;

      const txnData = MetaplexSerialize.serializeCreateArgs(data);

      const keys = [
        {
          pubkey: metaAccount.value as PublicKey,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: tokenKey,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: mintAuthorityKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: payer,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: updateAuthority,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
        {
          pubkey: SYSVAR_RENT_PUBKEY,
          isSigner: false,
          isWritable: false,
        },
      ];
      inst.push(
        new TransactionInstruction({
          keys,
          programId: Constants.METAPLEX_PROGRAM_ID,
          data: txnData,
        })
      );
      return Result.ok(inst);
    }

  export const update = (
    data: MetaplexInstructure.Data,
    newUpdateAuthority: PublicKey | null | undefined,
    primarySaleHappened: boolean | null | undefined,
    tokenKey: PublicKey,
    updateAuthority: PublicKey,
    signers: Keypair[],
  ) => async (instructions?: TransactionInstruction[]):
      Promise<Result<TransactionInstruction[] | PublicKey, Error>> => {
      let inst: TransactionInstruction[] = [];
      inst = instructions ? instructions : inst;

      const associatedToken = await Wallet.findAssocaiatedTokenAddress(
        updateAuthority,
        tokenKey
      );

      if (associatedToken.isErr) return associatedToken;

      inst.push(
        Wallet.createAssociatedTokenAccountInstruction(
          associatedToken.value as PublicKey,
          updateAuthority,
          updateAuthority,
          tokenKey
        )
      );

      inst.push(
        Token.createMintToInstruction(
          Constants.SPL_TOKEN_PROGRAM_ID,
          tokenKey,
          associatedToken.value as PublicKey,
          updateAuthority,
          signers,
          1,
        ),
      );

      const metaAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);
      if (metaAccount.isErr) return metaAccount;

      const txnData = MetaplexSerialize.serializeUpdateArgs(
        data,
        newUpdateAuthority,
        primarySaleHappened
      );
      const keys = [
        {
          pubkey: metaAccount.value as PublicKey,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: updateAuthority,
          isSigner: true,
          isWritable: false,
        },
      ];
      inst.push(
        new TransactionInstruction({
          keys,
          programId: Constants.METAPLEX_PROGRAM_ID,
          data: txnData,
        }),
      );
      return Result.ok(inst);
    }
}
