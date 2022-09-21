import { Keypair, Transaction, TransactionInstruction } from '@solana/web3.js';
import { CreateNftBuilderParams } from '@metaplex-foundation/js';

import {
  Validator,
  ValidatorError,
  InputMetaplexMetadata,
  MetaplexMetaData,
  Bundlr,
  Metaplex,
} from '@solana-suite/nft';
import { debugLog, Node, Result } from '@solana-suite/shared';
import { InitializeNftMint, Phantom } from './types';

export namespace MetaplexPhantom {
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    phantom: Phantom
  ): Promise<InitializeNftMint> => {
    const metaplex = Bundlr.make(phantom);
    const payer = metaplex.identity();
    const useNewMint = Keypair.generate();
    const updateAuthority = metaplex.identity();
    const mintAuthority = metaplex.identity();
    const tokenOwner = metaplex.identity().publicKey;
    const instructions = await Metaplex.createNftBuilderInstruction(
      payer,
      params,
      useNewMint,
      updateAuthority,
      mintAuthority,
      tokenOwner
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
   * @param {InputMetaplexMetadata}  input
   * @param {Phantom} phantom        phantom wallet object
   * @return Promise<Result<Instruction, Error>>
   */
  export const mint = async (
    input: InputMetaplexMetadata,
    cluster: string,
    phantom: Phantom
  ): Promise<Result<string, Error | ValidatorError>> => {
    const valid = Validator.checkAll<InputMetaplexMetadata>(input);
    if (valid.isErr) {
      return Result.err(valid.error);
    }

    Node.changeConnection({ cluster });

    const uploaded = await Metaplex.uploadMetaContent(input, phantom);
    if (uploaded.isErr) {
      return Result.err(uploaded.error);
    }

    const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded.value;

    debugLog('# upload content url: ', uri);
    debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
    debugLog('# reducedMetadata: ', reducedMetadata);

    const mintInput: MetaplexMetaData = {
      uri,
      sellerFeeBasisPoints,
      ...reducedMetadata,
    };
    const connection = Node.getConnection();

    const builder = await createNftBuilder(mintInput, phantom);
    debugLog('# mint: ', builder.useNewMint.publicKey.toString());
    builder.tx.feePayer = phantom.publicKey;
    const blockhashObj = await connection.getLatestBlockhashAndContext();
    builder.tx.recentBlockhash = blockhashObj.value.blockhash;
    builder.tx.partialSign(builder.useNewMint);
    const signed = await phantom.signTransaction(builder.tx);
    debugLog(
      '# signed, signed.signatures: ',
      signed,
      signed.signatures.map((sig) => sig.publicKey.toString())
    );
    const sig = await connection
      .sendRawTransaction(signed.serialize())
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(sig.error);
    }

    await Node.confirmedSig(sig.unwrap());
    return Result.ok(builder.useNewMint.publicKey.toString());
  };
}
