import { Keypair, Transaction } from '@solana/web3.js';
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
import { InitializeMint, Phantom } from './types';

export namespace MetaplexPhantom {
  const createNftBuilder = async (
    params: CreateNftBuilderParams,
    feePayer: Phantom
  ): Promise<InitializeMint> => {
    const metaplex = Bundlr.make(feePayer);
    const payer = metaplex.identity().secretKey!.toString().toKeypair();
    const useNewMint = Keypair.generate();
    const updateAuthority = payer;
    const mintAuthority = payer;
    const tokenOwner = metaplex.identity().publicKey;

    const instructions = await Metaplex.createNftBuilderInstruction(
      feePayer,
      params,
      useNewMint,
      updateAuthority,
      mintAuthority,
      tokenOwner
    );

    const transaction = new Transaction();
    instructions.forEach((inst) => transaction.add(inst));

    const blockhashObj =
      await Node.getConnection().getLatestBlockhashAndContext();
    transaction.recentBlockhash = blockhashObj.value.blockhash;
    transaction.partialSign(useNewMint);
    return { tx: transaction, mint: useNewMint.publicKey };
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
    phantom: Phantom
  ): Promise<Result<string, Error | ValidatorError>> => {
    const valid = Validator.checkAll<InputMetaplexMetadata>(input);
    if (valid.isErr) {
      return Result.err(valid.error);
    }

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
    debugLog('# mint: ', builder.mint.toString());
    builder.tx.feePayer = phantom.publicKey;
    const blockhashObj = await connection.getLatestBlockhashAndContext();
    builder.tx.recentBlockhash = blockhashObj.value.blockhash;

    debugLog('# tx: ', builder.tx.signatures);
    const signed = await phantom.signTransaction(builder.tx);
    debugLog(
      '# signed: ',
      signed.signatures.map((signature) => signature.publicKey.toString())
    );
    const sig = await connection
      .sendRawTransaction(signed.serialize())
      .then(Result.ok)
      .catch(Result.err);

    if (sig.isErr) {
      return Result.err(sig.error);
    }

    await Node.confirmedSig(sig.unwrap());
    return Result.ok(builder.mint.toString());
  };
}
