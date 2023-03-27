import {
  debugLog,
  Try,
  Node,
  Secret,
  KeypairAccount,
  Pubkey,
  PartialSignInstruction,
  Result,
} from '@solana-suite/shared';

import { Transaction } from '@solana/web3.js';

import { Storage } from '@solana-suite/storage';

import {
  Validator,
  InputNftMetadata,
  Properties,
  Royalty,
  MetaplexMetadata,
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

      let uploadUrl: string = '';
      let uri: string = '';
      let inputInfra!: InputNftMetadata;
      //Convert porperties, Upload content
      // storageType == 'only nft.storage'
      // -------------------------------------------------------------
      if (input.storageType === 'nftStorage') {
        const properties = await Properties.toConvertInfra(
          input.properties,
          Storage.uploadContent,
          input.storageType
        );

        inputInfra = {
          ...input,
          properties,
        };

        const nftStorageMetadata = Storage.toConvertNftStorageMetadata(
          inputInfra,
          sellerFeeBasisPoints
        );
        const uploaded = await Storage.uploadMetaContent(
          nftStorageMetadata,
          inputInfra.filePath,
          inputInfra.storageType
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uploadUrl = uploaded.value;
        debugLog('# upload content url: ', uploaded);
      }
      // -------------------------------------------------------------

      if (input.storageType === 'nftStorage' && uploadUrl) {
        uri = uploadUrl;
      } else if (input.storageType === 'arweave' && input.uri) {
        uri = input.uri;
      } else {
        throw Error('If want to use arweave, set input.uri parameter');
      }

      const datav2 = MetaplexMetadata.toConvertInfra(
        inputInfra,
        uri,
        sellerFeeBasisPoints
      );

      const isMutable =
        inputInfra.isMutable === undefined ? true : inputInfra.isMutable;

      debugLog('# inputInfra: ', inputInfra);
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
      return new PartialSignInstruction(hex);
    });
  };
}
