import { describe, it } from "mocha";
import { assert } from "chai";
import { KeypairStr } from "@solana-suite/core";
import { Setup } from "../../../shared/test/testSetup";
import { Metaplex } from "../../src/metaplex";
import { RandomAsset } from "../randomAsset";
import { StorageArweave } from "../../src/storage/arweave";

let source: KeypairStr;

describe("Metaplex", () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it("Mint nft", async () => {
    const asset = RandomAsset.get();
    console.log("[step1] upload content(image, movie, file,,,)");
    const upload = await StorageArweave.uploadContent(
      asset.filePath as string,
      source.toKeypair()
    );

    assert.isTrue(upload.isOk, upload.unwrap());
    const imageUri = upload.unwrap();

    console.log("[step2] upload metadata for metaplex(usually text data)");
    const uploadMetadata = await StorageArweave.uploadMetadata(
      {
        image: imageUri,
        name: asset.name,
        symbol: asset.symbol,
      },
      source.toKeypair()
    );

    assert.isTrue(uploadMetadata.isOk, uploadMetadata.unwrap());
    const uri = uploadMetadata.unwrap();

    const creator1 = {
      address: source.toPublicKey(),
      share: 70,
      verified: false,
    };
    const creator2 = {
      address: "93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk".toPublicKey(),
      share: 30,
      verified: false,
    };

    console.log('[step3] mint on Solana');
    const res = await Metaplex.mint(
      {
        name: asset.name,
        uri,
        symbol: asset.symbol,
        sellerFeeBasisPoints: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toPublicKey(),
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok) => {
        console.log("# mint:", res.unwrap().data);
        console.log("# sig:", ok);
      },
      (ng) => assert.fail(ng.message)
    );
  });

  it("one lump upload content and mint nft", async () => {
    const asset = RandomAsset.get();

    const creator1 = {
      address: source.toPublicKey(),
      share: 70,
      verified: false,
    };

    const creator2 = {
      address: "93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk".toPublicKey(),
      share: 30,
      verified: false,
    };

    const res = await Metaplex.uploadContentMint(
      {
        filePath: asset.filePath as string,
        storageType: "nftStorage",
        name: asset.name,
        symbol: asset.symbol,
        sellerFeeBasisPoints: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toPublicKey(),
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok) => {
        console.log("# mint:", res.unwrap().data);
        console.log("# sig:", ok);
      },
      (ng) => assert.fail(ng.message)
    );
  });

  // it('Mint nft and Burn nft', async () => {
  // });

  // it('Mint batched nft', async () => {
  // });

  // it('Transfer nft', async () => {
  // });

  // it('Transfer nft with fee payer', async () => {
  // });

  // it('Transfer nft with multi sig', async () => {

  //   // create multisig
  //   const signer1 = Account.create();
  //   const signer2 = Account.create();

  //   const multisig = await Multisig.create(
  //     2,
  //     source.toKeypair(),
  //     [
  //       signer1.toPublicKey(),
  //       signer2.toPublicKey(),
  //     ]
  //   );

  //   const resMulti = await multisig.submit();

  //   assert(resMulti.isOk, `${resMulti.unwrap()}`);

  //   const multisigAddress = multisig.unwrap().data as string;
  //   console.log('# multisig address: ', multisigAddress);

  // });
});
