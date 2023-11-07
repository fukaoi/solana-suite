


// export namespace CompressedNft {
//   export const mintCompressedNft = async (
//     nftArgs: MetadataArgs,
//     ownerKeypair: Keypair,
//     treeKeypair: Keypair,
//     collectionMint: Token,
//     collectionMetadata: PublicKey,
//     collectionMasterEditionAccount: PublicKey,
//   ) => {
//     const [treeAuthority, _bump] = await PublicKey.findProgramAddress(
//       [treeKeypair.publicKey.toBuffer()],
//       BUBBLEGUM_PROGRAM_ID,
//     );
//     const [bgumSigner, __] = await PublicKey.findProgramAddress(
//       [Buffer.from('collection_cpi', 'utf8')],
//       BUBBLEGUM_PROGRAM_ID,
//     );
//     const mintIx = createMintToCollectionV1Instruction(
//       {
//         merkleTree: treeKeypair.publicKey,
//         treeAuthority,
//         treeDelegate: ownerKeypair.publicKey,
//         payer: ownerKeypair.publicKey,
//         leafDelegate: ownerKeypair.publicKey,
//         leafOwner: ownerKeypair.publicKey,
//         compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
//         logWrapper: SPL_NOOP_PROGRAM_ID,
//         collectionAuthority: ownerKeypair.publicKey,
//         collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
//         collectionMint: collectionMint.publicKey,
//         collectionMetadata: collectionMetadata,
//         editionAccount: collectionMasterEditionAccount,
//         bubblegumSigner: bgumSigner,
//         tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
//       },
//       {
//         metadataArgs: Object.assign(nftArgs, {
//           collection: { key: collectionMint.publicKey, verified: false },
//         }),
//       },
//     );
//     const tx = new Transaction().add(mintIx);
//     tx.feePayer = ownerKeypair.publicKey;
//     try {
//       const sig = await sendAndConfirmTransaction(
//         connectionWrapper,
//         tx,
//         [ownerKeypair],
//         {
//           commitment: 'confirmed',
//           skipPreflight: true,
//         },
//       );
//       return sig;
//     } catch (e) {
//       console.error('Failed to mint compressed NFT', e);
//       throw e;
//     }
//   };
// }
