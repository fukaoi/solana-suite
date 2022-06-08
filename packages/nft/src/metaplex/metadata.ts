import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  RpcResponseAndContext,
  AccountInfo,
  ParsedAccountData,
  Signer
} from '@solana/web3.js';

import {
  Metaplex,
  MetaplexSerialize,
  MetaplexInstructure,
  MetaplexAccount,
} from './index';

import {
  Node,
  Constants,
  Result
} from '@solana-suite/shared';

import {
  Account
} from '@solana-suite/core';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createMintToInstruction,
} from '@solana/spl-token';

export namespace MetaplexMetaData {
  const createAssociatedTokenAccountInstruction = (
    metaAccount: PublicKey,
    mint: PublicKey,
    mintAuthorityKey: PublicKey,
    updateAuthority: PublicKey,
    payer: PublicKey,
    txnData: Buffer,
  ) => {
    const keys = [
      {
        pubkey: metaAccount,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: mint,
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

    return new TransactionInstruction({
      keys,
      programId: Constants.METAPLEX_PROGRAM_ID,
      data: txnData,
    })
  }

  const updateAssociatedTokenAccountInstruction = (
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
      programId: ASSOCIATED_TOKEN_PROGRAM_ID,
      data: Buffer.from([]),
    });
  }

  export const getByTokenKey = async (mint: PublicKey):
    Promise<Result<Metaplex.Format, Error>> => {
    const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);

    if (metaAccount.isErr) {
      return Result.err(metaAccount.error);
    }

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
      {programId: TOKEN_PROGRAM_ID}
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokens.isErr) return Result.err(tokens.error);
    const arr = tokens.value as RpcResponseAndContext<{
      pubkey: PublicKey;
      account: AccountInfo<ParsedAccountData
      >
    }[]>;

    const matches = [];
    // Filter only metaplex nft
    for (const token of arr.value) {
      const decoded = await getByTokenKey(
        token.account.data.parsed.info.mint.toPublicKey()
      );
      if (!decoded) continue;
      if (decoded.isErr) {
        return Result.err(decoded.error);
      }
      matches.push(decoded.value)
    }
    return Result.ok(matches);
  }

  export const create = async (
    data: MetaplexInstructure.Data,
    mint: PublicKey,
    mintAuthorityKey: PublicKey,
    updateAuthority: PublicKey,
    feePayer: PublicKey,
  ): Promise<Result<TransactionInstruction[], Error>> => {
    const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);
    if (metaAccount.isErr) {
      return Result.err(metaAccount.error);
    }

    const txnData = MetaplexSerialize.serializeCreateArgs(data);

    const inst = createAssociatedTokenAccountInstruction(
      metaAccount.unwrap(),
      mint,
      mintAuthorityKey,
      updateAuthority,
      feePayer,
      txnData,
    )
    return Result.ok([inst]);
  }

  export const update = async (
    data: MetaplexInstructure.Data,
    newUpdateAuthority: PublicKey | null | undefined,
    primarySaleHappened: boolean | null | undefined,
    mint: PublicKey,
    updateAuthority: PublicKey,
    signers: Signer[],
  ): Promise<Result<TransactionInstruction[], Error>> => {
    const inst: TransactionInstruction[] = [];

    const associatedToken = await Account.findAssocaiatedTokenAddress(
      mint,
      updateAuthority,
    );

    if (associatedToken.isErr) {
      return Result.err(associatedToken.error);
    }

    inst.push(
      updateAssociatedTokenAccountInstruction(
        associatedToken.value as PublicKey,
        updateAuthority,
        updateAuthority,
        mint
      )
    );

    inst.push(
      createMintToInstruction(
        mint,
        associatedToken.value as PublicKey,
        updateAuthority,
        1,
        signers,
        TOKEN_PROGRAM_ID
      )
    );

    const metaAccount = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(mint);
    if (metaAccount.isErr) {
      return Result.err(metaAccount.error);
    }

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
