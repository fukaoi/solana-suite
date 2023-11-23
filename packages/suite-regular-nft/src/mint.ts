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
import { debugLog, Result, Try, unixTimestamp } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { MintTransaction } from '~/transaction';
import { Node } from '~/node';
import { Storage } from '~/storage';
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
  const DEFAULT_STORAGE_TYPE = 'nftStorage';

  export const createVerifyCreator = (mint: PublicKey, creator: PublicKey) => {
    const metadata = Account.Pda.getMetadata(mint.toString());
    return createSignMetadataInstruction({
      metadata: metadata,
      creator: creator,
    });
  };

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
   * @param {Pubkey} owner          // first minted owner
   * @param {Secret} signer         // owner's Secret
   * @param {InputNftMetadata} input
   * {
   *   name: string               // nft content name
   *   symbol: string             // nft ticker symbol
   *   filePath: string | File    // nft ticker symbol
   *   royalty: number            // royalty percentage
   *   storageType: 'arweave'|'nftStorage' // Decentralized storage
   *   description?: string       // nft content description
   *   external_url?: string      // landing page, home page uri, related url
   *   attributes?: MetadataAttribute[]     // game character parameter, personality, characteristics
   *   properties?: MetadataProperties<Uri> // include file name, uri, supported file type
   *   collection?: Pubkey           // collections of different colors, shapes, etc.
   *   creators?: InputCreators[]    // other creators than owner
   *   uses?: Uses                   // usage feature: burn, single, multiple
   *   isMutable?: boolean           // enable update()
   *   options?: [key: string]?: unknown       // optional param, Usually not used.
   * }
   * @param {Partial<MintOptions>} options         // options
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    options: Partial<MintOptions> = {},
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }
      const { feePayer, freezeAuthority } = options;
      const payer = feePayer ? feePayer : signer;
      const storageType = input.storageType || DEFAULT_STORAGE_TYPE;

      // porperties, Upload content
      let properties;
      if (input.properties) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          storageType,
          payer,
        );
      }

      input = {
        ...input,
        properties,
        storageType,
      };

      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(input.royalty);
      const storageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
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
          payer,
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
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        instructions.push(
          createDeleagate(
            mint.toPublicKey(),
            owner.toPublicKey(),
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

      const keypairs = [signer.toKeypair(), mint.toKeypair()];

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

      return new MintTransaction(
        instructions,
        keypairs,
        payer.toKeypair(),
        mint.pubkey,
      );
    });
  };
}
