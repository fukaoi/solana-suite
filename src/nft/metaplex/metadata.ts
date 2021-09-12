import {ASSOCIATED_TOKEN_PROGRAM_ID, Token} from '@solana/spl-token';

import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  AccountInfo,
  Transaction as T,
  Keypair,
} from '@solana/web3.js';

import {serialize} from 'borsh';

import {Wallet} from '../../wallet';
import {Transaction} from '../../transaction';
import {Constants} from '../../constants';
import {MetaplexObject} from './object';
import {MetaplexSerialize} from './serialize';
import {Util} from '../../util';

export namespace MetaplexMetaData {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);

  const fetchMetaDataByMintKey = (mintKey: string, encoded: AccountInfo<string>) => {
    if (!encoded) return false;
    const decodeData = MetaplexSerialize.decode(encoded.data);
    return mintKey === decodeData.mintKey
  }

  const fetchMetaDataByOwnerPubKey = (ownerPubKey: string, encoded: AccountInfo<string>) => {
    if (!encoded) return false;
    const decodeData = MetaplexSerialize.decode(encoded.data);
    return ownerPubKey === decodeData.ownerPubKey
  }

  export const getByMintKey = async (mintKey: string) => {
    const accounts = await Transaction.getProgramAccounts(Constants.METAPLEX_PROGRAM_ID);
    const matches = accounts.filter(a => fetchMetaDataByMintKey(mintKey, a.account));
    return MetaplexSerialize.decode(matches[0].account.data);
  }

  // this function is very slowly from returned response. because alglism is liner search
  export const getByOwnerPubKey = async (ownerPubKey: string) => {
    const accounts = await Transaction.getProgramAccounts(Constants.METAPLEX_PROGRAM_ID);
    const matches = accounts.filter(a => fetchMetaDataByOwnerPubKey(ownerPubKey, a.account));
    return matches.map(match => MetaplexSerialize.decode(match.account.data));
  }

  export const create = async (
    data: MetaplexObject.Data,
    mintKey: string,
    payer: string,
    instructions: TransactionInstruction[],
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => {
    const metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();

    console.log('# metaAccount', metaAccount);

    const value = new MetaplexObject.CreateMetadataArgs({data, isMutable: true});
    const txnData = Buffer.from(serialize(MetaplexObject.SCHEMA, value));
    const keys = [
      {
        pubkey: new PublicKey(metaAccount),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: new PublicKey(mintKey),
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: new PublicKey(mintAuthorityKey),
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: new PublicKey(payer),
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: new PublicKey(updateAuthority),
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
    instructions.push(
      new TransactionInstruction({
        keys,
        programId: METADATA_PROGRAM_ID,
        data: txnData,
      })
    );
    return instructions;
  }

  export const update = async (
    data: MetaplexObject.Data | undefined,
    newUpdateAuthority: string | undefined,
    primarySaleHappened: boolean | null | undefined,
    mintKey: string,
    updateAuthority: string,
    recipientKey: string,
    sourceSecret: string,
  ) => {
    const instructions: TransactionInstruction[] = [];

    const associatedTokenAccount = await Wallet.findAssocaiatedTokenAddress(updateAuthority, mintKey);
    console.log('# associatedTokenAccount: ', associatedTokenAccount.toBase58());

    const associatedTokenAccountInfo = await Util.getConnection().getAccountInfo(associatedTokenAccount);
    console.log('# associatedTokenAccountInfo: ', associatedTokenAccountInfo);
    if (!associatedTokenAccountInfo) {

    }


    instructions.push(
      Wallet.createAssociatedTokenAccountInstruction(
        associatedTokenAccount.toBase58(),
        updateAuthority,
        updateAuthority,
        mintKey
      )
    );

    instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        associatedTokenAccount,
        new PublicKey(updateAuthority),
        [Util.createKeypair(sourceSecret)],
        1,
      ),
    );

    const metadata = await Util.getConnection().getAccountInfo(new PublicKey(mintKey));
    console.log(metadata);

    const metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();

    const value = new MetaplexObject.UpdateMetadataArgs({
      data,
      updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
      primarySaleHappened:
        primarySaleHappened === null || primarySaleHappened === undefined
          ? null
          : primarySaleHappened,
    });
    const txnData = Buffer.from(serialize(MetaplexObject.SCHEMA, value));
    console.log(value);
    const keys = [
      {
        pubkey: new PublicKey(metaAccount),
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: new PublicKey(updateAuthority),
        isSigner: true,
        isWritable: false,
      },
    ];
    instructions.push(
      new TransactionInstruction({
        keys,
        programId: new PublicKey(METADATA_PROGRAM_ID),
        data: txnData,
      }),
    );
    return instructions;
  }
}
