import {
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';

import {Wallet} from '../../wallet';
import {Constants} from '../../constants';
import {Metaplex, MetaplexSerialize, MetaplexInstructure} from './index';
import {Token} from '@solana/spl-token';
import {Node} from '../../node';

export namespace MetaplexMetaData {

  export const getByMintKey = async (mintKey: string): Promise<Metaplex.Format> => {
    const metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(
      mintKey)
    ).toBase58();

    // get rent data in a metaAccount
    const nfts = await Node.getConnection().getParsedAccountInfo(
      new PublicKey(metaAccount)
    );
    const data = nfts?.value?.data as Buffer;
    if (data) {
      return MetaplexSerialize.decode(data);
    }
    return Metaplex.initFormat();
  }

  export const getByOwner = async (ownerPubKey: string): Promise<Metaplex.Format[]> => {
    // Get all token by owner
    const tokens = await Node.getConnection().getParsedTokenAccountsByOwner(
      new PublicKey(ownerPubKey),
      {programId: Constants.SPL_TOKEN_PROGRAM_ID}
    );
    const matches = [];

    // Filter only metaplex nft
    for (const token of tokens.value) {
      const decoded = await getByMintKey(token.account.data.parsed.info.mint);
      if (!decoded) continue;
      matches.push(decoded)
    }
    return matches;
  }

  export const create = (
    data: MetaplexInstructure.Data,
    mintKey: string,
    payer: string,
    mintAuthorityKey = payer,
    updateAuthority = payer,
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;
    const metaAccount = (await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)).toBase58();

    console.log('# metaAccount', metaAccount);

    const txnData = MetaplexSerialize.serializeCreateArgs(data);

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
        programId: Constants.METAPLEX_PROGRAM_ID,
        data: txnData,
      })
    );
    return inst;
  }

  export const update = (
    data: MetaplexInstructure.Data,
    newUpdateAuthority: string | undefined,
    primarySaleHappened: boolean | null | undefined,
    mintKey: string,
    updateAuthority: string,
    signerSecrets: string[],
  ) => async (instructions?: TransactionInstruction[]) => {
    let inst: TransactionInstruction[] = [];
    inst = instructions ? instructions : inst;

    const signers = Wallet.createSigners(signerSecrets);

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
        Constants.SPL_TOKEN_PROGRAM_ID,
        new PublicKey(mintKey),
        associatedTokenAccount,
        new PublicKey(updateAuthority),
        signers,
        1,
      ),
    );

    const metaAccount = (
      await Wallet.findMetaplexAssocaiatedTokenAddress(mintKey)
    ).toBase58();

    const txnData = MetaplexSerialize.serializeUpdateArgs(
      data,
      newUpdateAuthority,
      primarySaleHappened
    );
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
        programId: Constants.METAPLEX_PROGRAM_ID,
        data: txnData,
      }),
    );
    return inst;
  }
}
