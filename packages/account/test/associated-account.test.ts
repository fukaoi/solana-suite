import test from "ava";
import { AssociatedAccount } from "../src/associated-account";
import { SplToken } from "@solana-suite/spl-token";
import { Setup } from "test-tools/setup";
import { RandomAsset } from "test-tools/setupAsset";
import { KeypairAccount } from "account";

let source: KeypairAccount;
const TOKEN_METADATA = {
  name: "solana-suite-token",
  symbol: "SST",
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: "nftStorage",
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test("Retry getOrCreate", async (t) => {
  const mintInst = await SplToken.mint(
    source.pubkey,
    source.secret,
    10000,
    1,
    TOKEN_METADATA,
  );

  await mintInst.submit();

  t.true(mintInst.isOk);
  const mint = mintInst.unwrap().data as string;

  const res = await AssociatedAccount.retryGetOrCreate(
    mint,
    source.pubkey,
    source.secret,
  );

  console.log("# associated token account: ", res);
  t.is(typeof res, "string");
});
