import {describe, it} from 'mocha';
import {Memo, Account} from '../src';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';

let source: Account.KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Submit instruction', async () => {
    const inst =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.secret.toKeypair()],
      );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap().sig);
  });

  it('Submit batch instructions', async () => {
    const inst1 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.secret.toKeypair()],
      );

    const inst2 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        [source.secret.toKeypair()],
      );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap().sig);
    console.log('# tx signature: ', res.unwrap().sig);
  });

})
