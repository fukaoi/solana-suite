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
import { KeypairAccount } from '~/account';
import { MintInstruction } from '~/instruction';
import { Pubkey, Secret } from '~/types/account';
import { UserInput } from '~/types/converter';
import { Pda } from '~/account';
import { Converter } from '~/converter';
import { Validator } from '~/validator';
import { SplToken as _Calculate } from './calculate-amount';
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

  export const createMintInstructions = async (
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
    const metadataPda = Pda.getMetadata(mint.toString());
    const tokenAssociated = getAssociatedTokenAddressSync(mint, owner);

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
      TOKEN_PROGRAM_ID,
    );

    const inst3 = createAssociatedTokenAccountInstruction(
      feePayer,
      tokenAssociated,
      owner,
      mint,
    );

    const inst4 = createMintToCheckedInstruction(
      mint,
      tokenAssociated,
      owner,
      _Calculate.calculateAmount(totalAmount, mintDecimal),
      mintDecimal,
    );

    const inst5 = createCreateMetadataAccountV3Instruction(
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
    );
    return [inst1, inst2, inst3, inst4, inst5];
  };

  /**
   * SPL-TOKEN mint
   *
   * @param {Pubkey} owner       // token owner
   * @param {Secret} signer      // token owner Secret
   * @param {number} totalAmount // total number
   * @param {number} mintDecimal // token decimal
   * @param {Pubkey} input       // token metadata
   * @param {Secret} feePayer?   // fee payer
   * @param {Pubkey} freezeAuthority? // freeze authority
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    totalAmount: number,
    mintDecimal: number,
    input: UserInput.TokenMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<UserInput.TokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;

      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input as UserInput.NftMetadata,
        input.royalty,
      );

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      tokenStorageMetadata.created_at = createdAt;

      let uri!: string;
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
        uri = input.uri;
      } else {
        throw Error("Must set 'storageType + filePath' or 'uri'");
      }

      const isMutable = true;

      const datav2 = Converter.TokenMetadata.intoInfraSide(
        input,
        uri,
        sellerFeeBasisPoints,
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

      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
