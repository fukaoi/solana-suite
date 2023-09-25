import { describe, it } from "mocha";
import { assert } from "chai";
import { FilterType, History, OnErr, OnOk, SplToken } from "../../src/";
import { Setup } from "../../../shared/test/testSetup";
import { Pubkey } from "@solana-suite/shared";

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

describe("SplToken", () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it("Get mint history", async () => {
    await SplToken.getHistory(target, FilterType.Mint, onOk, onErr);
  });
});
