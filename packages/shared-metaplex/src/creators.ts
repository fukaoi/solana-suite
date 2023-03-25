// import { CreatorInput, Creator } from '@metaplex-foundation/js';
// import { User, Infra } from './types';
//
// export namespace Creators {
//   export const toInputConvert = (
//     input: User.Creators[] | undefined
//   ): Infra.Creators[] => {
//     if (!input) {
//       return [];
//     }
//     return input.map((data) => {
//       const authority = data.authority ? data.authority.toKeypair() : undefined;
//       const modify: CreatorInput = {
//         address: data.address.toPublicKey(),
//         share: data.share,
//         authority: authority,
//       };
//       return modify;
//     });
//   };
//
//   export const toOutputConvert = (output: Creator[]): OCreators[] => {
//     return output.map((data) => {
//       const modify: OCreators = {
//         address: data.address.toString(),
//         share: data.share,
//         verified: data.verified,
//       };
//       return modify;
//     });
//   };
// }
