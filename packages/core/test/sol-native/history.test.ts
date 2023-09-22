import { describe, it } from "mocha";
import { FilterType, History, OnErr, OnOk, SolNative } from "../../src";
import { assert } from "chai";
import { Setup } from "../../../shared/test/testSetup";
import { Pubkey } from "../../../shared/src";

let target: Pubkey;
const onOk: OnOk<History> = (ok) => {
  console.log("# hisory size: ", ok.length);
  ok.forEach((res) => {
    assert.isNotEmpty(res.source);
    assert.isNotEmpty(res.destination);
    assert.isNotEmpty(res.tokenAmount);
    assert.isNotEmpty(res.signers);
    assert.isNotEmpty(res.multisigAuthority);
    assert.isNotNull(res.dateTime);
  });
};

const onErr: OnErr = (err: Error) => assert.fail(err.message);

describe("SolNative", () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it("Get transfer history", async () => {
    await SolNative.getHistory(target, FilterType.Transfer, onOk, onErr, {
      waitTime: 0,
    });
  });

  it("Get Memo history", async () => {
    await SolNative.getHistory(target, FilterType.Memo, onOk, onErr);

    it("[Error]Get Mint history", async () => {
      await SolNative.getHistory(
        target,
        FilterType.Mint,
        (_) => assert.fail("Dont go through here"),
        (err) => assert.isOk(err.message),
      );
    });
  });
});
