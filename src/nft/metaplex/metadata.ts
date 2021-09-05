import {Token} from '@solana/spl-token';

import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {deserializeUnchecked, serialize} from 'borsh';

import {Wallet} from '../../wallet';
import {Transaction} from '../../transaction';
import {Constants} from '../../constants';
import {MetaplexObject} from './object';

export namespace MetaplexMetaData {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);

  export const get = async (mintKey: string) => {
    const accounts = await Transaction.getProgramAccounts(Constants.METAPLEX_PROGRAM_ID);
    // const matches = accounts.filter(account => account.pubkey == 'DjskgZtivfGEJfZXV5G6vb8RwJMBfv8AxQG2EVUFQKmC');
    const matches = accounts.filter(account => account.pubkey == 'Ayatd9gxibNXpH1XGFUd6rh1qoH9e1ti1eR2uW4zymo6');
    const data = matches[0].account.data;
    console.log(data);
    // return decodeMetadata(data);
  }

  export const create = (
    data: MetaplexObject.Data,
    mintKey: string,
    payer: string,
    metadataAccount?: string,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]) => {
    let metaAccount = metadataAccount;
    if (!metadataAccount) {
      metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();
    }
  
    console.log('# metaAccount', metaAccount);

    const value = new MetaplexObject.CreateMetadataArgs({data, isMutable: true});
    const txnData = Buffer.from(serialize(MetaplexObject.SCHEMA, value));
    const keys = [
      {
        pubkey: new PublicKey(metaAccount!),
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
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;
    inst.push(
      new TransactionInstruction({
        keys,
        programId: METADATA_PROGRAM_ID,
        data: txnData,
      })
    );

    const recipientKey = await Wallet.findAssocaiatedTokenAddress(
      payer,
      mintKey
    );

    inst.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        new PublicKey(recipientKey),
        new PublicKey(payer),
        [],
        1,
      ),
    );
    return inst;
  }

  const METADATA_REPLACE = new RegExp('\u0000', 'g');

  const decodeMetadata = (buffer: Buffer) => {
    const metadata = deserializeUnchecked(
      MetaplexObject.SCHEMA,
      MetaplexObject.Data,
      buffer,
    ) as MetaplexObject.Data;
    console.log(metadata);
    // metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
    // metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
    // metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
    // return metadata;
  };
}
