// import { History, Memo, OnErr, OnOk } from "../../src/";
//
// const target = "Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD";
// const onOk: OnOk<History> = (ok) => {
//   console.log("# hisory size: ", ok.length);
//   ok.forEach((res) => {
//     assert.isNotEmpty(res.source);
//     assert.isNotEmpty(res.destination);
//     assert.isNotEmpty(res.tokenAmount);
//     assert.isNotEmpty(res.signers);
//     assert.isNotEmpty(res.multisigAuthority);
//     assert.isNotNull(res.dateTime);
//   });
// };
//
// const onErr: OnErr = (err: Error) => assert.fail(err.message);
//
// describe("Memo", () => {
//   it("Get Only memo history", async () => {
//     await Memo.getHistory(target, onOk, onErr);
//   });
// });
