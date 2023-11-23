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

import { debugLog, Result, Try } from '~/shared';

import { Node } from '~/node';
import { Account } from '~/account';
import { MintTransaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';
import { InputNftMetadata } from '~/types/regular-nft';
import { InputTokenMetadata, MintOptions } from '~/types/spl-token';
import { Converter } from '~/converter';
import { Validator } from '~/validator';
import { SplToken as Calculate } from './calculate-amount';
import { Storage } from '~/storage';

export namespace SplToken {
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
   * @param {Pubkey} owner       // token owner
   * @param {Secret} signer      // token owner Secret
   * @param {number} totalAmount // total number
   * @param {number} mintDecimal // token decimal
   * @param {InputTokenMetadata} input       // token metadata
   * @param {Partial<MintOptions>} options   // options
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    totalAmount: number,
    mintDecimal: number,
    input: InputTokenMetadata,
    options: Partial<MintOptions> = {},
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputTokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const { feePayer, freezeAuthority } = options;

      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;

      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input as InputNftMetadata,
        input.royalty,
      );

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      tokenStorageMetadata.created_at = createdAt;

      let uri!: string;
      // upload file
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          tokenStorageMetadata,
          input.filePath,
          input.storageType,
          payer,
        );

        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...tokenStorageMetadata, ...image },
          input.storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error("Must set 'storageType + filePath' or 'uri'");
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
        owner.toPublicKey(),
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
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      return new MintTransaction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
