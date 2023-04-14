import {
  debugLog,
  KeypairAccount,
  Node,
  PartialSignInstruction,
  Pubkey,
  Result,
  Secret,
  Try,
} from '@solana-suite/shared';

import { Transaction } from '@solana/web3.js';

import { Storage } from '@solana-suite/storage';

import {
  Collections,
  InputNftMetadata,
  MetaplexMetadata,
  Properties,
  Royalty,
  Validator,
} from '@solana-suite/shared-metaplex';

import { Metaplex as _Mint } from './mint';

export namespace Metaplex {
  export const feePayerPartialSignMint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer: Pubkey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const sellerFeeBasisPoints = Royalty.convert(input.royalty);

      //--- porperties, Upload content ---
      let uri = '';
      if (input.filePath && input.storageType === 'nftStorage') {
        const properties = await Properties.toConvertInfra(
          input.properties,
          Storage.uploadContent,
          input.storageType
        );

        const nftStorageMetadata = Storage.toConvertNftStorageMetadata(
          { ...input, properties },
          sellerFeeBasisPoints
        );

        const uploaded = await Storage.uploadMetaAndContent(
          nftStorageMetadata,
          input.filePath,
          input.storageType
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        debugLog('# upload content url: ', uploaded);
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType=nftStorage + filePath' or 'uri'`);
      }
      //--- porperties, Upload content ---

      let datav2 = MetaplexMetadata.toConvertInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );

      //--- collection ---
      let collection;
      if (input.collection && input.collection) {
        collection = Collections.toConvertInfra(input.collection);
        datav2 = { ...datav2, collection };
      }
      //--- collection ---

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# datav2: ', datav2);

      const mint = KeypairAccount.create();
      const insts = await _Mint.createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        feePayer.toPublicKey(),
        isMutable
      );

      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      const tx = new Transaction({
        lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
        blockhash: blockhashObj.blockhash,
        feePayer: feePayer.toPublicKey(),
      });

      insts.forEach((inst) => tx.add(inst));
      tx.recentBlockhash = blockhashObj.blockhash;
      [signer, mint].forEach((signer) => tx.partialSign(signer.toKeypair()));

      const serializedTx = tx.serialize({
        requireAllSignatures: false,
      });
      const hex = serializedTx.toString('hex');
      return new PartialSignInstruction(hex, mint.pubkey);
    });
  };
}
