import { Connection, Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
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
  Pubkey,
  Secret,
} from '@solana-suite/shared';

import {
  Bundlr,
  InputTokenMetadata,
  TokenMetadata,
  Validator,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';

export namespace SplToken {
  export const createMintInstruction = async (
    connection: Connection,
    mint: PublicKey,
    owner: PublicKey,
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: TokenMetadata,
    feePayer: PublicKey,
    isMutable: boolean,
    signers?: Keypair[]
  ) => {
    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const metadataPda = Bundlr.make().nfts().pdas().metadata({ mint: mint });

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
      mintDecimal,
      signers
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

      !feePayer && (feePayer = signer);
      const uploaded = await Storage.uploadMetaContent(input, feePayer);
      const { uri, sellerFeeBasisPoints, reducedMetadata } = uploaded;

      debugLog('# upload content url: ', uri);
      debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
      debugLog('# reducedMetadata: ', reducedMetadata);

      const tokenMetadata: TokenMetadata = {
        name: reducedMetadata.name,
        symbol: reducedMetadata.symbol,
        uri,
        sellerFeeBasisPoints,
        creators: reducedMetadata.creators,
        collection: reducedMetadata.collection,
        uses: reducedMetadata.uses,
      };
      const isMutable = !reducedMetadata.isMutable ? false : true;

      const connection = Node.getConnection();
      const mint = Keypair.generate();
      const insts = await createMintInstruction(
        connection,
        mint.publicKey,
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        tokenMetadata,
        feePayer.toKeypair().publicKey,
        isMutable
      );
      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint],
        feePayer.toKeypair(),
        mint.publicKey.toString()
      );
    });
  };
}
