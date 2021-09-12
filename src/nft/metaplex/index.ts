import {
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction} from '../../transaction';

import {SplNft} from '../spl';
import {MetaplexMetaData} from './metadata';
import {MetaplexNft} from './nft';
import {MetaplexObject} from './object';

export namespace Metaplex {
  export const transfer = async (
    tokenKey: string,
    sourceSecret: string,
    destPubKey: string,
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {

    return await SplNft.transfer(
      tokenKey,
      sourceSecret,
      destPubKey,
      instruction
    );
  }

  export const mint = async (
    data: MetaplexObject.Data,
    owner: {pubkey: string, secret: string},
  ): Promise<TransactionSignature> => {
    const txsign = await MetaplexNft.mint(owner.pubkey, [owner.secret])();

    console.log('# mintKey: ', txsign.mintKey);

    const metadataInst = await MetaplexMetaData.create(
      data,
      txsign.mintKey,
      owner.pubkey,
    )(txsign.instructions);

    const updateTx = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      txsign.mintKey,
      owner.pubkey,
      owner.pubkey,
      owner.secret,
    )(metadataInst);

    const tx = await Transaction.sendInstructions(
      txsign.signers,
      updateTx
    );

    return tx;
  }
}
