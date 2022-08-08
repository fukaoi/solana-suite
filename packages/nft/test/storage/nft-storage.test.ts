import { describe, it } from "mocha";
import { assert } from "chai";
import { RandomAsset } from "../randomAsset";
import { StorageNftStorage } from "../../src";

describe("StorageNftStorage", () => {
  it("Upload content data", async () => {
    const asset = RandomAsset.get();
    const res = await StorageNftStorage.uploadContent(asset.filePath!);

    res.match(
      (ok) => console.log("# nft.storage content url: ", ok),
      (err) => assert.fail(err.message)
    );
  });

  it("Upload metadata json", async () => {
    const asset = RandomAsset.get();
    const image = await StorageNftStorage.uploadContent(asset.filePath!);
    asset.image = image.unwrap();
    delete(asset.filePath);
    const res = await StorageNftStorage.uploadMetadata(asset);

    res.match(
      (ok) => console.log("# nft.storage metadata url: ", ok),
      (err) => assert.fail(err.message)
    );
  });
});
