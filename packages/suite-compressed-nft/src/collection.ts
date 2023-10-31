import {
  createCreateMasterEditionV3Instruction,
  createCreateMetadataAccountV3Instruction,
  createSetCollectionSizeInstruction,
  PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
} from '@metaplex-foundation/mpl-token-metadata';

import { PublicKey, SystemProgram } from '@solana/web3.js';
import {
  createAccount,
  createInitializeMint2Instruction,
  createMint,
  mintTo,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { debugLog, Try } from '~/shared';
import { Validator } from '~/validator';
import { Node } from '~/node';
import { Instruction } from '~/instruction';
import { KeypairAccount } from '@solana-suite/spl-token';
import { RegularNft } from '~/suite-regular-nft';
// import { SplToken } from '~/suite-spl-token';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @return Promise<Result<Instruction, Error>>
 */
// export namespace CompressedNft {
//   export const mintCollection = (
//     owner: Pubkey,
//     signer: Secret,
//     input: UserSideInput.NftMetadata,
//     feePayer?: Secret,
//     freezeAuthority?: Pubkey,
//   ) => {
//     return Try(async () => {
//       const valid = Validator.checkAll<UserSideInput.NftMetadata>(input);
//       if (valid.isErr) {
//         throw valid.error;
//       }
//
//       const payer = feePayer ? feePayer : signer;
//
//       //--- porperties, Upload content ---
//       let properties;
//       if (input.properties && input.storageType) {
//         properties = await Converter.Properties.intoInfraSide(
//           input.properties,
//           Storage.uploadFile,
//           input.storageType,
//           payer,
//         );
//       } else if (input.properties && !input.storageType) {
//         throw Error('Must set storageType if will use properties');
//       }
//
//       input = {
//         ...input,
//         properties,
//       };
//       //--- porperties, Upload content ---
//
//       const nftStorageMetadata = Storage.toConvertOffchaindata(input, 0);
//
//       // created at by unix timestamp
//       const createdAt = Math.floor(new Date().getTime() / 1000);
//       nftStorageMetadata.created_at = createdAt;
//
//       let uri!: string;
//       if (input.filePath && input.storageType) {
//         const uploaded = await Storage.upload(
//           nftStorageMetadata,
//           input.filePath,
//           input.storageType,
//           payer,
//         );
//         debugLog('# upload content url: ', uploaded);
//         if (uploaded.isErr) {
//           throw uploaded;
//         }
//         uri = uploaded.value;
//       } else if (input.uri) {
//         uri = input.uri;
//       } else {
//         throw Error(`Must set 'storageType + filePath' or 'uri'`);
//       }
//
//       let datav2 = Converter.NftMetadata.intoInfraSide(
//         input,
//         uri,
//         sellerFeeBasisPoints,
//       );
//
//       //--- collection ---
//       let collection;
//       if (input.collection && input.collection) {
//         collection = Converter.Collection.intoInfraSide(input.collection);
//         datav2 = { ...datav2, collection };
//       }
//
//       const isMutable = input.isMutable === undefined ? true : input.isMutable;
//
//       debugLog('# input: ', input);
//       debugLog('# sellerFeeBasisPoints: ', sellerFeeBasisPoints);
//       debugLog('# datav2: ', datav2);
//
//       const mint = KeypairAccount.create();
//
//       const insts = await createMintInstructions(
//         mint.toPublicKey(),
//         owner.toPublicKey(),
//         datav2,
//         payer.toKeypair().publicKey,
//         isMutable,
//       );
//
//       // freezeAuthority
//       if (freezeAuthority) {
//         insts.push(
//           createDeleagateInstruction(
//             mint.toPublicKey(),
//             owner.toPublicKey(),
//             freezeAuthority.toPublicKey(),
//           ),
//         );
//       }
//
//       return new MintInstruction(
//         insts,
//         [signer.toKeypair(), mint.toKeypair()],
//         payer.toKeypair(),
//         mint.pubkey,
//       );
//     });
//   };
// }
