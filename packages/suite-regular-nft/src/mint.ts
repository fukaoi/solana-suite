import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';

import {
  createApproveInstruction,
  createAssociatedTokenAccountInstruction,
  createInitializeMintInstruction,
  createMintToCheckedInstruction,
  getAssociatedTokenAddressSync,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { debugLog, Result, Try } from '~/suite-utils';
import { Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { MintStructure } from '~/types/transaction-builder';
import { Node } from '~/node';
import { Storage } from '~/suite-storage';
import { InputNftMetadata, MintOptions } from '~/types/regular-nft';
import { Converter } from '~/converter';
import { Validator } from '~/validator';
import { Account } from '~/account';

import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createSignMetadataInstruction,
  createVerifySizedCollectionItemInstruction,
  DataV2,
} from '@metaplex-foundation/mpl-token-metadata';

export namespace RegularNft {
  const NFT_AMOUNT = 1;
  const DEFAULT_STORAGE_TYPE = 'filebase';

  //@internal
  export const createVerifyCreator = (mint: PublicKey, creator: PublicKey) => {
    const metadata = Account.Pda.getMetadata(mint.toString());
    return createSignMetadataInstruction({
      metadata: metadata,
      creator: creator,
    });
  };

  //@internal
  export const createDeleagate = (
    mint: PublicKey,
    owner: PublicKey,
    delegateAuthority: PublicKey,
  ): TransactionInstruction => {
    const tokenAccount = getAssociatedTokenAddressSync(mint, owner);

    return createApproveInstruction(
      tokenAccount,
      delegateAuthority,
      owner,
      NFT_AMOUNT,
    );
  };

  //@internal
  export const createVerifySizedCollection = (
    collectionChild: PublicKey,
    collectionParent: PublicKey,
    feePayer: PublicKey,
  ) => {
    const collectionMetadata = Account.Pda.getMetadata(
      collectionParent.toString(),
    );
    const collectionMasterEditionAccount = Account.Pda.getMasterEdition(
      collectionParent.toString(),
    );
    return createVerifySizedCollectionItemInstruction({
      collection: collectionMetadata,
      collectionMasterEditionAccount: collectionMasterEditionAccount,
      collectionMint: collectionParent,
      metadata: Account.Pda.getMetadata(collectionChild.toString()),
      payer: feePayer,
      collectionAuthority: feePayer,
    });
  };

  //@internal
  export const createMint = async (
    mint: PublicKey,
    owner: PublicKey,
    nftMetadata: DataV2,
    feePayer: PublicKey,
    isMutable: boolean,
  ): Promise<TransactionInstruction[]> => {
    const ata = getAssociatedTokenAddressSync(mint, owner);
    const tokenMetadataPubkey = Account.Pda.getMetadata(mint.toString());
    const masterEditionPubkey = Account.Pda.getMasterEdition(mint.toString());
    const connection = Node.getConnection();
    const instructions = [];

    instructions.push(
      SystemProgram.createAccount({
        fromPubkey: feePayer,
        newAccountPubkey: mint,
        lamports: await getMinimumBalanceForRentExemptMint(connection),
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
      }),
    );

    instructions.push(createInitializeMintInstruction(mint, 0, owner, owner));

    instructions.push(
      createAssociatedTokenAccountInstruction(feePayer, ata, owner, mint),
    );

    instructions.push(createMintToCheckedInstruction(mint, ata, owner, 1, 0));

    instructions.push(
      createCreateMetadataAccountV3Instruction(
        {
          metadata: tokenMetadataPubkey,
          mint,
          mintAuthority: owner,
          payer: feePayer,
          updateAuthority: owner,
        },
        {
          createMetadataAccountArgsV3: {
            data: nftMetadata,
            isMutable,
            collectionDetails: null,
          },
        },
      ),
    );

    instructions.push(
      createCreateMasterEditionV3Instruction(
        {
          edition: masterEditionPubkey,
          mint,
          updateAuthority: owner,
          mintAuthority: owner,
          payer: feePayer,
          metadata: tokenMetadataPubkey,
        },
        {
          createMasterEditionArgs: {
            maxSupply: 0,
          },
        },
      ),
    );
    return instructions;
  };

  /**
   * Upload content and NFT mint
   *
   * @param {Secret} owner            // owner's Secret
   * @param {InputNftMetadata} input  // nft metadata
   * @param {Partial<MintOptions>} options // options
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Secret,
    input: InputNftMetadata,
    options: Partial<MintOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const payer = feePayer ? feePayer : owner;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;
      const ownerPublicKey = owner.toKeypair().publicKey;

      // porperties, Upload content
      let properties;
      if (input.properties) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          { feePayer: payer },
        );
      }

      input = {
        ...input,
        properties,
        storageType,
      };

      const royalty = input.royalty ? input.royalty : 0;
      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      let uri!: string;
      // upload file
      if (input.filePath) {
        const uploaded = await Storage.upload(
          storageMetadata,
          input.filePath,
          storageType,
          { feePayer: payer },
        );
        debugLog('# upload content url: ', uploaded);
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
        // uploaded file
      } else if (input.uri) {
        const image = { image: input.uri };
        const uploaded = await Storage.uploadData(
          { ...storageMetadata, ...image },
          storageType,
          { feePayer: payer },
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set filePath' or 'uri'`);
      }

      const datav2 = Converter.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# datav2: ', datav2);

      const mint = Account.Keypair.create();

      const instructions = await createMint(
        mint.toPublicKey(),
        ownerPublicKey,
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        instructions.push(
          createDeleagate(
            mint.toPublicKey(),
            ownerPublicKey,
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      // collection ---
      if (input.collection) {
        instructions.push(
          createVerifySizedCollection(
            mint.toPublicKey(),
            input.collection.toPublicKey(),
            payer.toKeypair().publicKey,
          ),
        );
      }

      const keypairs = [owner.toKeypair(), mint.toKeypair()];

      // creator ---
      if (input.creators) {
        input.creators.forEach((creator) => {
          if (Account.Keypair.isSecret(creator.secret)) {
            const creatorPubkey = creator.address.toPublicKey();
            const inst = createVerifyCreator(mint.toPublicKey(), creatorPubkey);
            instructions.push(inst);
            keypairs.push(creator.secret.toKeypair());
          }
        });
      }

      return new TransactionBuilder.Mint(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
