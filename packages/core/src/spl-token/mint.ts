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
  Pubkey,
  Secret,
  KeypairAccount,
} from '@solana-suite/shared';

import {
  InputNftMetadata,
  InputTokenMetadata,
  Pda,
  TokenMetadata,
  Validator,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';

export namespace SplToken {
  export const createMintInstructions = async (
    mint: PublicKey,
    owner: PublicKey,
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: DataV2,
    feePayer: PublicKey,
    isMutable: boolean
  ): Promise<TransactionInstruction[]> => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Pda.getMetadata(mint);
    const tokenAssociated = await getAssociatedTokenAddress(mint, owner);

    const inst1 = SystemProgram.createAccount({
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
    return [inst1, inst2, inst3, inst4, inst5];
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

      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;

      const tokenStorageMetadata = Storage.toConvertNftStorageMetadata(
        input as InputNftMetadata,
        input.royalty
      );

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.uploadMetaContent(
          tokenStorageMetadata,
          input.filePath,
          input.storageType,
          payer
        );

        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        uri = input.uri;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }

      const isMutable = true;

      const datav2 = TokenMetadata.toConvertInfra(
        input,
        uri,
        sellerFeeBasisPoints
      );

      debugLog('# datav2: ', datav2);
      debugLog('# upload content url: ', uri);

      const mint = KeypairAccount.create();
      const insts = await createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        totalAmount,
        mintDecimal,
        datav2,
        payer.toKeypair().publicKey,
        isMutable
      );

      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey
      );
    });
  };
}
