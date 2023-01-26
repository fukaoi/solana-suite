import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  getMinimumBalanceForRentExemptMint,
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddress,
} from '@solana/spl-token';

import {
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';
import { Node, Result, Instruction, Try } from '@solana-suite/shared';
import {
  Bundlr,
  InputTokenMetadata,
  Validator,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';

export namespace SplToken {
  export const mint = async (
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    input: InputTokenMetadata,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputTokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      !feePayer && (feePayer = signers[0]);
      const uploaded = await Storage.uploadMetaContent(input, feePayer);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;
      const tokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        collection: reducedMetadata.collection,
        uses: reducedMetadata.uses,
      };

      const connection = Node.getConnection();
      const lamports = await getMinimumBalanceForRentExemptMint(connection);

      const mint = Keypair.generate();
      signers.push(mint);
      const metadataPda = Bundlr.make()
        .nfts()
        .pdas()
        .metadata({ mint: mint.publicKey });

      const tokenAssociated = await getAssociatedTokenAddress(
        mint.publicKey,
        owner
      );

      const inst = SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        lamports: lamports,
        programId: TOKEN_PROGRAM_ID,
      });

      const inst2 = createInitializeMintInstruction(
        mint.publicKey,
        mintDecimal,
        owner,
        owner,
        TOKEN_PROGRAM_ID
      );

      const inst3 = createAssociatedTokenAccountInstruction(
        owner,
        tokenAssociated,
        owner,
        mint.publicKey
      );

      const inst4 = createMintToInstruction(
        mint.publicKey,
        tokenAssociated,
        owner,
        _Calculate.calculateAmount(totalAmount, mintDecimal)
      );

      const inst5 = createCreateMetadataAccountV2Instruction(
        {
          metadata: metadataPda,
          mint: mint.publicKey,
          mintAuthority: owner,
          payer: feePayer.publicKey,
          updateAuthority: owner,
        },
        {
          createMetadataAccountArgsV2: {
            data: tokenMetadata as DataV2,
            isMutable: true,
          },
        }
      );

      return new Instruction(
        [inst, inst2, inst3, inst4, inst5],
        signers,
        feePayer,
        mint.publicKey.toBase58()
      );
    });
  };
}
