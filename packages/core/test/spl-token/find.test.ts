import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';
import { DirectionFilter } from '../../src/types/find';

describe('SplToken', () => {
  it('Get token transfer history by owner address', async () => {
    const mint = '9v7HRkw3Fdt3Ee45z4Y9Mn9jzakHBQmSRZudPJGjbruY'.toPublicKey();
    const searchAddress =
      'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPublicKey();
    const res = await SplToken.findByOwner(mint, searchAddress);
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history with transfer source filter', async () => {
    const mint = '9v7HRkw3Fdt3Ee45z4Y9Mn9jzakHBQmSRZudPJGjbruY'.toPublicKey();
    const searchAddress =
      'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPublicKey();
    const res = await SplToken.findByOwner(mint, searchAddress);
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history with transfer dest filter', async () => {
    const mint = '6yiSjqsmmW48zJ6bM2Fb6jHHebHRfDzXoYRV1f1nt3JX'.toPublicKey();
    const searchAddress =
      '8g66KBwriunG4PsKePYZaxd88dW3WKaryqtfpLqrijcV'.toPublicKey();
    const res = await SplToken.findByOwner(mint, searchAddress, {
      directionFilter: DirectionFilter.Dest,
    });
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Not found token', async () => {
    const owner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT'.toPublicKey();
    const res = await SplToken.getTokenInfoOwned(owner);
    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isEmpty(r.mint);
      assert.isEmpty(r.tokenAmount);
    });
  });

  it('Get token info owned', async () => {
    const owner = 'Hc3FoHMo3Von8by8oKxx9nqTWkjQuGxM1sgyDQCLEMA9'.toPublicKey();
    const res = await SplToken.getTokenInfoOwned(owner);
    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isNotEmpty(r.mint);
      assert.isString(r.mint);
      assert.isNumber(r.tokenAmount);
    });
  });
});
