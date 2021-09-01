import {Token} from '@solana/spl-token';

import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {serialize} from 'borsh';

import {Wallet} from '../../wallet';
import {Constants} from '../../constants';
import {MetaplexObject} from './object';

export namespace MetaplexMetaData {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);
  export const create = async (
    data: MetaplexObject.Data,
    mintKey: string,
    payer: string,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => {
    const metadataAccount = Wallet.findMetaplexAssocaiatedTokenAddress(mintKey);

    const value = new MetaplexObject.CreateMetadataArgs({data, isMutable: true});
    debugger;
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
    const instructions: TransactionInstruction[] = [];
    instructions.push(
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

    instructions.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        new PublicKey(recipientKey),
        new PublicKey(payer),
        [],
        1,
      ),
    );
    return instructions;
  }
}
