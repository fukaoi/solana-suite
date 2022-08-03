import { describe, it } from "mocha";
import { assert } from "chai";
import { KeypairStr } from "@solana-suite/core";
import { Setup } from "../../../shared/test/testSetup";
import { Metaplex } from "../../src/metaplex";
import { RandomAsset } from "../randomAsset";
import { StorageArweave } from "../../src";

let source: KeypairStr;

describe("Metaplex", () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it.only("Mint nft", async () => {
    const asset = RandomAsset.storage();
    // step1 upload content(image, movie, file,,,)
    const upload = await StorageArweave.uploadContent(
      asset.filePath!,
      source.toKeypair()
    );

    assert.isTrue(upload.isOk, upload.unwrap());
    const imageUri = upload.unwrap();

    // step2 upload metadata for metaplex(usually text data)
    const uploadMetadata = await StorageArweave.uploadMetadata(
      {
        filePath: imageUri,
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

    // step3 mint on Solana
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

  it('one lump upload content and mint nft', async () => {
    const asset = RandomAsset.storage();
    const res = Metaplex.uploadContentMint(
      asset,
      source.toPublicKey(),
      source.toKeypair(),
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
