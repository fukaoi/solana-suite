import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createSetCollectionSizeInstruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';

import { PublicKey, SystemProgram } from '@solana/web3.js';
import {
  createInitializeMint2Instruction,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { debugLog, Try } from '~/shared';
import { Node } from '~/node';
import { Instruction } from '~/instruction';
// import { SplToken } from '~/suite-spl-token';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @return Promise<Result<Instruction, Error>>
 */
export namespace CompressedNft {
  export const initCollection = (feePayer: Secret) => {
    return Try(async () => {
      const payer = feePayer.toKeypair();

      // const inst1 = createInitializeMint2Instruction(
      //   feePayer.toKeypair().publicKey,
      //   0,
      //   feePayer.toKeypair().publicKey,
      //   feePayer.toKeypair().publicKey,
      //   feePayer.toKeypair().publicKey,
      // );

      const mint = await Token.createMint(
        Node.getConnection(),
        payer,
        payer.publicKey,
        payer.publicKey,
        0,
        TOKEN_PROGRAM_ID,
      );

      const collectionTokenAccount = await mint.createAccount(payer.publicKey);
      await mint.mintTo(collectionTokenAccount, payer, [], 1);
      const [collectionMetadataAccount, _b] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.publicKey.toBuffer(),
        ],
        TOKEN_METADATA_PROGRAM_ID,
      );

      const inst1 = createCreateMetadataAccountV3Instruction(
        {
          metadata: collectionMetadataAccount,
          mint: mint.publicKey,
          mintAuthority: payer.publicKey,
          payer: payer.publicKey,
          updateAuthority: payer.publicKey,
        },
        {
          createMetadataAccountArgsV3: {
            data: {
              name: "Nick's collection",
              symbol: 'NICK',
              uri: 'nicksfancyuri',
              sellerFeeBasisPoints: 100,
              creators: null,
              collection: null,
              uses: null,
            },
            isMutable: false,
            collectionDetails: null,
          },
        },
      );
      const [collectionMasterEditionAccount] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata', 'utf8'),
          TOKEN_METADATA_PROGRAM_ID.toBuffer(),
          mint.publicKey.toBuffer(),
          Buffer.from('edition', 'utf8'),
        ],
        TOKEN_METADATA_PROGRAM_ID,
      );
      const inst2 = createCreateMasterEditionV3Instruction(
        {
          edition: collectionMasterEditionAccount,
          mint: mint.publicKey,
          mintAuthority: payer.publicKey,
          payer: payer.publicKey,
          updateAuthority: payer.publicKey,
          metadata: collectionMetadataAccount,
        },
        {
          createMasterEditionArgs: {
            maxSupply: 0,
          },
        },
      );

      const inst3 = createSetCollectionSizeInstruction(
        {
          collectionMetadata: collectionMetadataAccount,
          collectionAuthority: payer.publicKey,
          collectionMint: mint.publicKey,
        },
        {
          setCollectionSizeArgs: { size: 50 },
        },
      );
      const collectionMetadata = collectionMetadataAccount.toString();
      const collectionAuthority = payer.publicKey.toString();
      const collectionMint = mint.publicKey.toString();

      return new Instruction([inst1, inst2, inst3], [payer], payer, {
        collectionMint,
        collectionMetadata,
        collectionAuthority,
      });
    });
  };
}
