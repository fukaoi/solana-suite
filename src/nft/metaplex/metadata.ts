import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Keypair,
  AccountInfo,
} from '@solana/web3.js';

import {Wallet} from '../../wallet';
import {Constants} from '../../constants';
import {Metaplex, MetaplexSerialize, MetaplexInstructure} from './index';
import {Node, Result} from '../../index';
import {Token} from '@solana/spl-token';

export namespace MetaplexMetaData {

  // export const getByTokenKey = async (tokenKey: PublicKey): Promise<Metaplex.Format> => {
  export const getByTokenKey = async (tokenKey: PublicKey) => {
    const metaAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);

    if (metaAccount.isFail()) return metaAccount;

    const nfts = await Node.getConnection().getParsedAccountInfo(
      <PublicKey>metaAccount.value
    )
      .then(Result.ok)
      .catch(Result.fail);

    if (nfts.isFail())  return nfts;

    const accountInfo = nfts.value.value;

      const data = accountInfo?.value?.data as Buffer;
      if (data) {
        return MetaplexSerialize.decode(data);
      }
      return Metaplex.initFormat();
  }

  export const getByOwner = async (owner: PublicKey): Promise<Metaplex.Format[]> => {
    // Get all token by owner
    const tokens = await Node.getConnection().getParsedTokenAccountsByOwner(
      owner,
      {programId: Constants.SPL_TOKEN_PROGRAM_ID}
    );
    const matches = [];

    // Filter only metaplex nft
    for (const token of tokens.value) {
      const decoded = await getByTokenKey(token.account.data.parsed.info.mint.toPubKey());
      if (!decoded) continue;
      matches.push(decoded)
    }
    return Result.ok(matches);
  }

  export const create = (
    data: MetaplexInstructure.Data,
    tokenKey: PublicKey,
    payer: PublicKey,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;
    const metaAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(tokenKey);
    if (metaAccount.isFail()) return metaAccount;

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
    return inst;
  }

  export const update = (
    data: MetaplexInstructure.Data,
    newUpdateAuthority: PublicKey | null | undefined,
    primarySaleHappened: boolean | null | undefined,
    tokenKey: PublicKey,
    updateAuthority: PublicKey,
    signers: Keypair[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const associatedToken = await Wallet.findAssocaiatedTokenAddress(
      updateAuthority,
      tokenKey
    );

    if (associatedToken.isFail()) return associatedToken;

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
    if (metaAccount.isFail()) return metaAccount;

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
    return inst;
  }
}
