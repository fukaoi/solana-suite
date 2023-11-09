import { InputNftMetadata } from '~/types/regular-nft';
import {
  createMintToCollectionV1Instruction,
  PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
} from '@metaplex-foundation/mpl-bubblegum';

/**
 * Upload content and Compressed NFT mint
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
export namespace CompressedNft {

  export const mint = async (
    input: InputNftMetadata,
    owner: Pubkey,
    signer: Secret,
    treeOwner: Secret,
    collectionMint: Pubkey,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ) => {
    const [treeAuthority, _bump] = await PublicKey.findProgramAddress(
      [treeKeypair.publicKey.toBuffer()],
      BUBBLEGUM_PROGRAM_ID,
    );
    const [bgumSigner, __] = await PublicKey.findProgramAddress(
      [Buffer.from('collection_cpi', 'utf8')],
      BUBBLEGUM_PROGRAM_ID,
    );
    const mintIx = createMintToCollectionV1Instruction(
      {
        merkleTree: treeKeypair.publicKey,
        treeAuthority,
        treeDelegate: ownerKeypair.publicKey,
        payer: ownerKeypair.publicKey,
        leafDelegate: ownerKeypair.publicKey,
        leafOwner: ownerKeypair.publicKey,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        collectionAuthority: ownerKeypair.publicKey,
        collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
        collectionMint: collectionMint.publicKey,
        collectionMetadata: collectionMetadata,
        editionAccount: collectionMasterEditionAccount,
        bubblegumSigner: bgumSigner,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      },
      {
        metadataArgs: Object.assign(nftArgs, {
          collection: { key: collectionMint.publicKey, verified: false },
        }),
      },
    );
    const tx = new Transaction().add(mintIx);
    tx.feePayer = ownerKeypair.publicKey;
    try {
      const sig = await sendAndConfirmTransaction(
        connectionWrapper,
        tx,
        [ownerKeypair],
        {
          commitment: 'confirmed',
          skipPreflight: true,
        },
      );
      return sig;
    } catch (e) {
      console.error('Failed to mint compressed NFT', e);
      throw e;
    }
  };
}
