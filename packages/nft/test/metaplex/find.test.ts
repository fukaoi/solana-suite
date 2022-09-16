import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';

describe('Metaplex.find', () => {
  it('Find owner info', async () => {
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';
    const res = await Metaplex.findByOwner(owner.toPublicKey());
    res.match(
      (ok) => {
        assert.isTrue(ok.length > 0);
        console.log('# find owner info: ', ok);
      },
      (err) => {
        assert.fail(err.message);
      }
    );
  });
});
