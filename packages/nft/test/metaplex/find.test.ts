import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';
import { Sortable } from '../../src/metaplex/find';

describe('Metaplex.find', () => {
  it.only('Find owner info', async () => {
    console.log('#Normal: ');
    const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
    await Metaplex.findByOwner(owner, (result) => {
      result.match(
        (ok) => {
          console.log(ok);
          assert.isNotEmpty(ok);
        },
        (err) => assert.fail(err.message)
      );
    });
  });

  it('Find owner info with Desc', async () => {
    console.log('#Desc: ');
    const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
    await Metaplex.findByOwner(
      owner,
      (result) => {
        result.match(
          (ok) => {
            console.log(ok);
            assert.isNotEmpty(ok);
          },
          (err) => assert.fail(err.message)
        );
      },
      Sortable.Desc
    );
  });

  it('Find owner info with Asc', async () => {
    console.log('#Asc: ');
    const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
    await Metaplex.findByOwner(
      owner,
      (result) => {
        result.match(
          (ok) => {
            console.log(ok);
            assert.isNotEmpty(ok);
          },
          (err) => assert.fail(err.message)
        );
      },
      Sortable.Asc
    );
  });
});
