import {describe, it} from 'mocha';
import {assert} from 'chai';
import {KeypairStr} from '@solana-suite/core';
import {Setup} from '../../../shared/test/testSetup';
import {RandomAsset} from '../randomAsset';
import {StorageArweave} from '../../src';

let source: KeypairStr;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageArweave.uploadContent(
      source.toKeypair(),
      asset.image,
      asset.image,
    );
    res.match(
      _ => console.log('# arweave manifest url: ', res.unwrap()),
      err => assert.fail(err.message)
    );
  });
})
