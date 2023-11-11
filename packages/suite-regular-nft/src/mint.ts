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
import { debugLog, Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { MintTransaction } from '~/transaction';
import { Node } from '~/node';
import { Storage } from '~/storage';
import { InputNftMetadata } from '~/types/regular-nft';
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

  export const createVerifyCreator = (mint: PublicKey, creator: PublicKey) => {
    const metadata = Account.Pda.getMetadata(mint.toString());
    return createSignMetadataInstruction({
      metadata: metadata,
      creator: creator,
    });
  };

  export const createDeleagateInstruction = (
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

  export const createVerifySizedCollectionInstruction = (
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

  export const createMintInstructions = async (
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
   * @param {Secret} feePayer?         // fee payer
   * @param {Pubkey} freezeAuthority?  // freeze authority
   * @return Promise<Result<MintInstruction, Error>>
   */
  export const mint = async (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    return Try(async () => {
      const valid = Validator.checkAll<InputNftMetadata>(input);
      if (valid.isErr) {
        throw valid.error;
      }

      const payer = feePayer ? feePayer : signer;

      // porperties, Upload content
      let properties;
      if (input.properties && input.storageType) {
        properties = await Converter.Properties.intoInfra(
          input.properties,
          Storage.uploadFile,
          input.storageType,
          payer,
        );
      } else if (input.properties && !input.storageType) {
        throw Error('Must set storageType if will use properties');
      }

      input = {
        ...input,
        properties,
      };

      const sellerFeeBasisPoints = Converter.Royalty.intoInfra(input.royalty);
      const nftStorageMetadata = Storage.toConvertOffchaindata(
        input,
        sellerFeeBasisPoints,
      );

      // created at by unix timestamp
      const createdAt = Math.floor(new Date().getTime() / 1000);
      nftStorageMetadata.created_at = createdAt;

      let uri!: string;
      // upload file
      if (input.filePath && input.storageType) {
        const uploaded = await Storage.upload(
          nftStorageMetadata,
          input.filePath,
          input.storageType,
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
          { ...nftStorageMetadata, ...image },
          input.storageType,
          payer,
        );
        if (uploaded.isErr) {
          throw uploaded;
        }
        uri = uploaded.value;
      } else {
        throw Error(`Must set 'storageType + filePath' or 'uri'`);
      }

      let datav2 = Converter.RegularNftMetadata.intoInfra(
        input,
        uri,
        sellerFeeBasisPoints,
      );

      const isMutable = input.isMutable === undefined ? true : input.isMutable;

      debugLog('# input: ', input);
      debugLog('# datav2: ', datav2);

      const mint = Account.Keypair.create();

      const instructions = await createMintInstructions(
        mint.toPublicKey(),
        owner.toPublicKey(),
        datav2,
        payer.toKeypair().publicKey,
        isMutable,
      );

      // freezeAuthority
      if (freezeAuthority) {
        instructions.push(
          createDeleagateInstruction(
            mint.toPublicKey(),
            owner.toPublicKey(),
            freezeAuthority.toPublicKey(),
          ),
        );
      }

      // collection ---
      if (input.collection) {
        instructions.push(
          createVerifySizedCollectionInstruction(
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
