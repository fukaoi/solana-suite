import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';
import {
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  createCreateMetadataAccountV3Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';

import { debugLog, Result, Try, unixTimestamp } from '~/shared';

import { Node } from '~/node';
import { Account } from '~/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Secret } from '~/types/account';
import { InputNftMetadata } from '~/types/regular-nft';
import { InputTokenMetadata, MintOptions } from '~/types/spl-token';
import { Converter } from '~/converter';
import { Validator } from '~/validator';
import { SplToken as Calculate } from './calculate-amount';
import { Storage } from '~/storage';
import { MintStructure } from '~/types/transaction-builder';

export namespace SplToken {
  const DEFAULT_STORAGE_TYPE = 'nftStorage';
  export const createFreezeAuthority = (
    mint: PublicKey,
    owner: PublicKey,
    freezeAuthority: PublicKey,
  ): TransactionInstruction => {
    return createSetAuthorityInstruction(
      mint,
      owner,
      AuthorityType.FreezeAccount,
      freezeAuthority,
    );
  };

  export const createMint = async (
    mint: PublicKey,
    owner: PublicKey,
    totalAmount: number,
    mintDecimal: number,
    tokenMetadata: DataV2,
    feePayer: PublicKey,
    isMutable: boolean,
  ): Promise<TransactionInstruction[]> => {
    const connection = Node.getConnection();
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const metadataPda = Account.Pda.getMetadata(mint.toString());
    const tokenAssociated = getAssociatedTokenAddressSync(mint, owner);
    const instructions = [];

    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint,
        space: MINT_SIZE,
        lamports: lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    instructions.push(
      createInitializeMintInstruction(
        mint,
        mintDecimal,
        owner,
        owner,
        TOKEN_PROGRAM_ID,
      ),
    );

    instructions.push(
      createAssociatedTokenAccountInstruction(
        feePayer,
        tokenAssociated,
        owner,
        mint,
      ),
    );

    instructions.push(
      createMintToCheckedInstruction(
        mint,
        tokenAssociated,
        owner,
        Calculate.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
      ),
    );

    instructions.push(
      createCreateMetadataAccountV3Instruction(
        {
          metadata: metadataPda,
          mint,
          mintAuthority: owner,
          payer: feePayer,
          updateAuthority: owner,
        },
        {
          createMetadataAccountArgsV3: {
            data: tokenMetadata,
            isMutable,
            collectionDetails: null,
          },
        },
      ),
    );
    return instructions;
  };

  /**
   * SPL-TOKEN mint
   *
   * @param {Secret} owner      // token owner Secret
   * @param {number} totalAmount // total number
   * @param {number} mintDecimal // token decimal
   * @param {InputTokenMetadata} input       // token metadata
   * @param {Partial<MintOptions>} options   // options
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Secret,
    totalAmount: number,
    mintDecimal: number,
    input: InputTokenMetadata,
    options: Partial<MintOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputTokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const { feePayer, freezeAuthority } = options;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const payer = feePayer ? feePayer : owner;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;
      const ownerPublicKey = owner.toKeypair().publicKey;

      const storageMetadata = Storage.toConvertOffchaindata(
        input as InputNftMetadata,
        input.royalty,
      );

      // created at by unix timestamp
      storageMetadata.created_at = unixTimestamp();

      let uri!: string;
      // upload file
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          payer,
        );

        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }

      const isMutable = true;

      const datav2 = Converter.TokenMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      debugLog('# datav2: ', datav2);
      debugLog('# upload content url: ', uri);

      const mint = Account.Keypair.create();
      const insts = await createMint(
        mint.toPublicKey(),
        ownerPublicKey,
        totalAmount,
        mintDecimal,
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        insts.push(
          createFreezeAuthority(
            mint.toPublicKey(),
            ownerPublicKey,
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      return new TransactionBuilder.Mint(
        insts,
        [owner.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
