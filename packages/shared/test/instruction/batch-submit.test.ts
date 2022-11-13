import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Result } from '../../src/result';
// import { Memo } from '../../../core/src/memo';
import { Setup, KeypairStr } from '../testSetup';
import '../../src/global';
import { Node } from '../../src/node';

let source: KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  // WARNING: call core  module, but raise error because look at  dist/cjs/node.js

  // it('Submit batch instructions', async () => {
  //   console.log('node status', Node.getConnection());
  //   const inst1 = Memo.create(
  //     '{"title": "Submit first instruction"}',
  //     source.toPublicKey(),
  //     source.toKeypair()
  //   );
  //
  //   const inst2 = Memo.create(
  //     '{"title": "Submit first instruction"}',
  //     source.toPublicKey(),
  //     source.toKeypair()
  //   );
  //
  //   const res = await [inst1, inst2].submit();
  //   assert.isTrue(res.isOk, res.unwrap());
  //   console.log('# tx signature: ', res.unwrap());
  // });
  //
  // it('Submit instructions, Result type', async () => {
  //   const inst = Result.ok(
  //     Memo.create(
  //       '{"title": "Submit first instruction"}',
  //       source.toPublicKey(),
  //       source.toKeypair()
  //     )
  //   );
  //
  //   const res = await inst.submit();
  //   assert.isTrue(res.isOk, res.unwrap());
  //   console.log('# tx signature: ', res.unwrap());
  // });
  //
  // it('Submit batch instructions, Result type', async () => {
  //   const inst1 = Result.ok(
  //     Memo.create(
  //       '{"title": "Submit first instruction"}',
  //       source.toPublicKey(),
  //       source.toKeypair()
  //     )
  //   );
  //
  //   const inst2 = Result.ok(
  //     Memo.create(
  //       '{"title": "Submit second instruction"}',
  //       source.toPublicKey(),
  //       source.toKeypair()
  //     )
  //   );
  //
  //   const res = await [inst1, inst2].submit();
  //   assert.isTrue(res.isOk, res.unwrap());
  //   console.log('# tx signature: ', res.unwrap());
  // });
  //
  // it('Submit batch many instructions', async () => {
  //   const inst = [];
  //   for (let i = 0; i < 20; i++) {
  //     inst.push(
  //       Memo.create(
  //         `{"title": "Submit ${i} instruction"}`,
  //         source.toPublicKey(),
  //         source.toKeypair()
  //       )
  //     );
  //   }
  //   const res = await inst.submit();
  //   assert.isTrue(res.isOk, res.unwrap());
  //   console.log('# tx signature: ', res.unwrap());
  // });

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

  // it('[Err]Submit batch instructions, Include Error in Result type', async () => {
  //   const inst1 = Result.ok(
  //     Memo.create(
  //       '{"title": "Submit first instruction"}',
  //       source.toPublicKey(),
  //       source.toKeypair()
  //     )
  //   );
  //
  //   const inst2 = Result.err(Error('Raise error, seconde instruction'));
  //
  //   const res = await [inst1, inst2].submit();
  //   assert.isTrue(res.isErr);
  //   console.log(res.isErr && res.error.message);
  // });

  it('[Err]Use invalid array when Submit batch instructions', async () => {
    const res = await ['invalid type'].submit();
    assert.isTrue(res.isErr);
  });
});
