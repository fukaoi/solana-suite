import {describe, it} from 'mocha';
import {Memo, KeypairStr, Instructions} from '../src';
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

 it.only('[Err]Use invalid array when Submit batch instructions', async () => {
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

    
   // const res = await ['test'].submit();
   // console.log(res);

    const res = await [inst1, inst2, 1].submit();
    // assert.isTrue(res.isOk, res.unwrap());
    // console.log('# tx signature: ', res.unwrap());
  });

})
