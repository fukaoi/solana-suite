import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

import {
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';

import {
  Node,
  Result,
  MintInstruction,
  Try,
  debugLog,
  overwriteObject,
  Pubkey,
  Secret,
  KeypairAccount,
} from '@solana-suite/shared';

import {
  InputTokenMetadata,
  _InputNftMetadata,
  _TokenMetadata,
  Validator,
  Creators,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage, Bundlr } from '@solana-suite/storage';

export namespace SplToken {
  export const createMintInstructions = async (
    mint: PublicKey,
    owner: PublicKey,
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: _TokenMetadata,
    feePayer: PublicKey,
    isMutable: boolean
  ): Promise<TransactionInstruction[]> => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Bundlr.make().nfts().pdas().metadata({ mint: mint }); //todo: replaced getMetadataPda()
    const tokenAssociated = await getAssociatedTokenAddress(mint, owner);

    const inst = SystemProgram.createAccount({
      fromPubkey: feePayer,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports: lamports,
      programId: TOKEN_PROGRAM_ID,
    });

    const inst2 = createInitializeMintInstruction(
      mint,
      mintDecimal,
      owner,
      owner,
      TOKEN_PROGRAM_ID
    );

    const inst3 = createAssociatedTokenAccountInstruction(
      feePayer,
      tokenAssociated,
      owner,
      mint
    );

    const inst4 = createMintToCheckedInstruction(
      mint,
      tokenAssociated,
      owner,
      _Calculate.calculateAmount(totalAmount, mintDecimal),
      mintDecimal
    );

    const inst5 = createCreateMetadataAccountV2Instruction(
      {
        metadata: metadataPda,
        mint,
        mintAuthority: owner,
        payer: feePayer,
        updateAuthority: owner,
      },
      {
        createMetadataAccountArgsV2: {
          data: tokenMetadata as DataV2,
          isMutable,
        },
      }
    );
    return [inst, inst2, inst3, inst4, inst5];
  };

  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    totalAmount: number,
    mintDecimal: number,
    input: InputTokenMetadata,
    feePayer?: Secret
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputTokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer.toKeypair() : signer.toKeypair();
      input.royalty = input.royalty ? input.royalty : 0;

      let overwrited = input as _InputNftMetadata;
      if (input.creators) {
        const creatorsValue = Creators.toInputConvert(input.creators);
        overwrited = overwriteObject(input, [
          {
            existsKey: 'creators',
            will: {
              key: 'creators',
              value: creatorsValue,
            },
          },
        ]) as _InputNftMetadata;
      }

      debugLog('# overwrited: ', overwrited);
      const uploaded = await Storage.uploadMetaContent(overwrited, feePayer);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const tokenMetadata: _TokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        uses: reducedMetadata.uses,
        collection: undefined,
      };
      const isMutable = !reducedMetadata.isMutable ? false : true;

      const mint = KeypairAccount.create();
      const insts = await createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        tokenMetadata,
        payer.publicKey,
        isMutable
      );
      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer,
        mint.pubkey
      );
    });
  };
}
