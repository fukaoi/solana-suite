import {Token} from '@solana/spl-token';

import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {deserializeUnchecked, serialize} from 'borsh';

import {Wallet} from '../../wallet';
import {Constants} from '../../constants';
import {MetaplexObject} from './object';
import {Util} from '../../util';

export namespace MetaplexMetaData {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);


  export const get = async (mintKey: string) => {
    const accounts = await Util.getConnection().getProgramAccounts(METADATA_PROGRAM_ID);
    return decodeMetadata(accounts[0].account.data);
  }

  export const create = (
    data: MetaplexObject.Data,
    mintKey: string,
    payer: string,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]) => {
    const metadataAccount = await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey);
    const value = new MetaplexObject.CreateMetadataArgs({data, isMutable: true});
    const txnData = Buffer.from(serialize(MetaplexObject.SCHEMA, value));
    const keys = [
      {
        pubkey: new PublicKey(metadataAccount),
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
        programId: new PublicKey(METADATA_PROGRAM_ID),
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

  const decodeMetadata = (buffer: Buffer): MetaplexObject.Metadata => {
    const metadata = deserializeUnchecked(
      MetaplexObject.SCHEMA,
      MetaplexObject.Metadata,
      buffer,
    ) as MetaplexObject.Metadata;
    metadata.data.name = metadata.data.name.replace(METADATA_REPLACE, '');
    metadata.data.uri = metadata.data.uri.replace(METADATA_REPLACE, '');
    metadata.data.symbol = metadata.data.symbol.replace(METADATA_REPLACE, '');
    return metadata;
  };
}
