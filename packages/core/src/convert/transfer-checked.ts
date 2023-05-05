// import {
//   ParsedTransactionWithMeta,
//   PublicKey,
// } from '@solana/web3.js';
//
// import {
//   DirectionFilter,
//   MappingTokenAccount,
//   UserSideOutput,
//   InfraSideOutput,
//   WithMemo,
// } from '../types/';
//
// import { Convert as _Shared } from './shared';
//
// export namespace Convert.Transaction {
//   export const intoUserSide = (
//     searchKey: PublicKey,
//     output: InfraSideOutput.Transaction,
//     meta: ParsedTransactionWithMeta,
//     directionFilter?: DirectionFilter,
//     mappingTokenAccount?: MappingTokenAccount[],
//     isToken?: boolean,
//     withMemos?: WithMemo[]
//   ): UserSideOutput.History | undefined => {
//     let v: UserSideOutput.History = {};
//
//     if (isToken && mappingTokenAccount && output.program === 'spl-token') {
//       const foundSource = mappingTokenAccount.find(
//         (m) => m.account === output.info.source
//       );
//       const foundDest = mappingTokenAccount.find(
//         (m) => m.account === output.info.destination
//       );
//
//       foundSource && (v.info.source = foundSource.owner);
//       foundDest && (v.info.destination = foundDest.owner);
//     }
//
//     v.sol = output.info.lamports?.toSol();
//     delete v.info.lamports;
//     v.date = _Shared.Shared.convertTimestampToDate(meta.blockTime as number);
//     v.sig = meta.transaction.signatures[0];
//     v.innerInstruction = false;
//     if (withMemos && withMemos.length > 0) {
//       const finded = withMemos.find(
//         (obj) => obj.sig === meta.transaction.signatures
//       );
//       finded && (v.memo = finded.memo);
//     }
//
//     // inner instructions
//     if (
//       meta.meta?.innerInstructions &&
//       meta.meta?.innerInstructions.length !== 0
//     ) {
//       v.innerInstruction = true;
//     }
//
//     if (directionFilter) {
//       if (v.info[directionFilter] === searchKey.toString()) {
//         return v;
//       }
//     } else {
//       return v;
//     }
//   };
// }
