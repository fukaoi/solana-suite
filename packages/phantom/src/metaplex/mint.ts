import { Transaction, TransactionInstruction } from '@solana/web3.js';
import { CreateNftBuilderParams } from '@metaplex-foundation/js';

import { Metaplex } from '@solana-suite/nft';
import { Storage, Bundlr } from '@solana-suite/storage';
import {
  debugLog,
  Node,
  Result,
  Try,
  KeypairAccount,
} from '@solana-suite/shared';
import {
  Validator,
  ValidatorError,
  InputNftMetadata,
  Creators,
  Collections,
  Properties,
  _InputNftMetadata,
  _MetaplexNftMetaData,
} from '@solana-suite/shared-metaplex';
import { InitializeNftMint, Phantom } from '../types';

export namespace PhantomMetaplex {
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    phantom: Phantom
  ): Promise<InitializeNftMint> => {
    const metaplex = Bundlr.make(phantom);
    const payer = metaplex.identity();
    const updateAuthority = metaplex.identity();
    const mintAuthority = metaplex.identity();
    const tokenOwner = metaplex.identity();
    const useNewMint = KeypairAccount.create();
    const instructions = await Metaplex.createNftBuilderInstruction(
      payer,
      params,
      useNewMint.secret.toKeypair(),
      updateAuthority,
      mintAuthority,
      tokenOwner.publicKey.toString()
    );

    const transaction = new Transaction();
    transaction.feePayer = payer.publicKey;
    instructions.forEach((inst: TransactionInstruction) => {
      transaction.add(inst);
    });

    return { tx: transaction, useNewMint: useNewMint };
  };

  /**
   * Upload content and NFT mint
   *
   * @param {InputNftMetadata}  input
   * @param {Phantom} phantom        phantom wallet object
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: InputNftMetadata,
    cluster: string,
    phantom: Phantom
  ): Promise<Result<string, Error | ValidatorError>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      debugLog('# input: ', input);

      Node.changeConnection({ cluster });

      //Convert creators
      const creators = Creators.toInputConvert(input.creators);
      debugLog('# creators: ', creators);

      //Convert collection
      const collection = Collections.toInputConvert(input.collection);
      debugLog('# collection: ', collection);

      //Convert porperties, Upload content
      const properties = await Properties.toInputConvert(
        input.properties,
        Storage.uploadContent,
        input.storageType,
      );
      debugLog('# properties: ', properties);

      const overwrited = {
        ...input,
        creators,
        collection,
        properties,
      } as _InputNftMetadata;

      const uploaded = await Storage.uploadMetaContent(overwrited);

      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const mintInput: _MetaplexNftMetaData = {
        uri,
        sellerFeeBasisPoints,
        ...reducedMetadata,
      };
      const connection = Node.getConnection();

      const builder = await createNftBuilder(mintInput, phantom);
      debugLog('# mint: ', builder.useNewMint.pubkey);
      builder.tx.feePayer = phantom.publicKey;
      const blockhashObj = await connection.getLatestBlockhashAndContext();
      builder.tx.recentBlockhash = blockhashObj.value.blockhash;
      builder.tx.partialSign(builder.useNewMint.toKeypair());
      const signed = await phantom.signTransaction(builder.tx);
      debugLog(
        '# signed, signed.signatures: ',
        signed,
        signed.signatures.map((sig) => sig.publicKey.toString())
      );
      const sig = await connection.sendRawTransaction(signed.serialize());
      await Node.confirmedSig(sig);
      return builder.useNewMint.pubkey;
    });
  };
}
