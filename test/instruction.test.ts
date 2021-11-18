import {describe, it} from 'mocha';
import {Memo, KeypairStr, Instructions, Result} from '../src';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';
let source: KeypairStr;
describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Submit instruction', async () => {
    const inst =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
  });

  it('Submit batch instructions', async () => {
    const inst1 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      );

    const inst2 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Submit instructions, Result type', async () => {
    const inst =
      Result.ok(Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      ));

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Submit batch instructions, Result type', async () => {
    const inst1 =
      Result.ok(Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      ));

    const inst2 =
      Result.ok(Memo.create(
        '{"title": "Submit second instruction"}',
        [source.toKeypair()],
      ));

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('[Err]Submit instructions, Result type', async () => {
    const message = 'Raise error';
    const inst = Result.err(Error(message));

    const res = await inst.submit();
    assert.isTrue(res.isErr);
    if (res.isErr) {
      assert.equal(res.error.message, message);
    } else {
      assert.fail('Not found Error object');
    }
  });

  it('[Err]Submit batch instructions, Include Error in Result type', async () => {
    const message = 'Raise error, seconde instructure';
    const inst1 =
      Result.ok(Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      ));

    const inst2 = Result.err(Error(message));

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isErr);
    res.isErr &&
      assert.equal(res.error.message, `[Array index: 1]${message}`);
  });

  it('[Err]Use invalid array when Submit batch instructions', async () => {
    const res = await ['invalid type'].submit();
    assert.isTrue(res.isErr);
  });
})
