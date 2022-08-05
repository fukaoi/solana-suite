import { describe, it } from "mocha";
import { KeypairStr } from "@solana-suite/core";
import { Setup } from "../../../shared/test/testSetup";
import { assert } from "chai";
import { Bundlr } from "../../src/bundlr";
import {BundlrStorageDriver} from "@metaplex-foundation/js";

let source: KeypairStr;

describe("Bundlr", () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it("Call bundlr connect", async () => {
    const res = Bundlr.driver(source.toKeypair());
    assert.isObject(res);
    assert.isTrue(res instanceof BundlrStorageDriver);
  });
});
