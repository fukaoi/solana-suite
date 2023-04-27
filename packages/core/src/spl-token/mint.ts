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
  createCreateMetadataAccountV2Instruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';

import {
  debugLog,
  KeypairAccount,
  MintInstruction,
  Node,
  Pubkey,
  Result,
  Secret,
  Try,
} from '@solana-suite/shared';

import {
  Pda,
  TokenMetadata,
  UserSideInput,
  Validator,
} from '@solana-suite/shared-metaplex';
import { SplToken as _Calculate } from './calculate-amount';
import { Storage } from '@solana-suite/storage';

export namespace SplToken {
  export const createFreezeAuthority = (
    mint: PublicKey,
    owner: PublicKey,
    freezeAuthority: PublicKey
  ): TransactionInstruction => {
    return createSetAuthorityInstruction(
      mint,
      owner,
      AuthorityType.FreezeAccount,
      freezeAuthority
    );
  };

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
          data: tokenMetadata,
          isMutable,
        },
      }
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
    input: UserSideInput.TokenMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey
  ): Promise<Result<MintInstruction, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<UserSideInput.TokenMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;
      input.royalty = 0;
      const sellerFeeBasisPoints = 0;

      const tokenStorageMetadata = Storage.toConvertOffchaindata(
        input as UserSideInput.NftMetadata,
        input.royalty
      );

      let uri!: string;
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.uploadMetaAndContent(
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

      // freezeAuthority
      if (freezeAuthority) {
        insts.push(
          createFreezeAuthority(
            mint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey()
          )
        );
      }

      return new MintInstruction(
        insts,
        [signer.toKeypair(), mint.toKeypair()],
        payer.toKeypair(),
        mint.pubkey
      );
    });
  };
}
