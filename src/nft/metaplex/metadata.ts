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
import {MetaplexSerialize} from './serialize';
import {Util} from '../../util';
import {Token} from '@solana/spl-token';

export namespace MetaplexMetaData {
  const TOKEN_PROGRAM_ID = new PublicKey(Constants.SPL_TOKEN_PROGRAM_ID);
  const METADATA_PROGRAM_ID = new PublicKey(Constants.METAPLEX_PROGRAM_ID);

  export const getByMintKey = async (mintKey: string): 
  Promise<MetaplexSerialize.MetaData | undefined> => {
    const metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(
      mintKey)
    ).toBase58();

    // get rent data in a metaAccount
    const nfts = await Util.getConnection().getParsedAccountInfo(
      new PublicKey(metaAccount)
    );
    if (nfts?.value?.data) {
      const data = nfts.value.data as Buffer;
      return MetaplexSerialize.decode(data);
    };
    return MetaplexSerialize.initData();
  }

  export const getByOwner = async (ownerPubKey: string):
    Promise<MetaplexSerialize.MetaData[]|undefined> => {
    // Get all token by owner
    const tokens = await Util.getConnection().getParsedTokenAccountsByOwner(
      new PublicKey(ownerPubKey),
      {programId: TOKEN_PROGRAM_ID}
    );

    const matches: MetaplexSerialize.MetaData[] = [];

    // Filter only metaplex nft
    for (const token of tokens.value) {
      const decoded = await getByMintKey(token.account.data.parsed.info.mint);
      if (!decoded) continue;
      matches.push(decoded)
    }
    return matches;
  }

  export const create = (
    data: MetaplexObject.Data,
    mintKey: string,
    payer: string,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;
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
    inst.push(
      new TransactionInstruction({
        keys,
        programId: METADATA_PROGRAM_ID,
        data: txnData,
      })
    );
    return inst;
  }

  export const update = (
    data: MetaplexObject.Data | undefined,
    newUpdateAuthority: string | undefined,
    primarySaleHappened: boolean | null | undefined,
    mintKey: string,
    updateAuthority: string,
    recipientKey: string, // todo:
    sourceSecret: string,
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const associatedTokenAccount = await Wallet.findAssocaiatedTokenAddress(updateAuthority, mintKey);
    console.log('# associatedTokenAccount: ', associatedTokenAccount.toBase58());

    inst.push(
      Wallet.createAssociatedTokenAccountInstruction(
        associatedTokenAccount.toBase58(),
        updateAuthority,
        updateAuthority,
        mintKey
      )
    );

    inst.push(
      Token.createMintToInstruction(
        TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        associatedTokenAccount,
        new PublicKey(updateAuthority),
        [Util.createKeypair(sourceSecret)],
        1,
      ),
    );

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
    inst.push(
      new TransactionInstruction({
        keys,
        programId: METADATA_PROGRAM_ID,
        data: txnData,
      }),
    );
    return inst;
  }
}
