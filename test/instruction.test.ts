import {describe, it} from 'mocha';
import {Memo, KeypairStr} from '../src';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';

let source: KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    console.log(source);
  });

  it('Submit instruction', async () => {
    const inst =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.toKeypair()],
      );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap().sig);
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
    assert.isTrue(res.isOk, res.unwrap().sig);
    console.log('# tx signature: ', res.unwrap().sig);
  });

})
