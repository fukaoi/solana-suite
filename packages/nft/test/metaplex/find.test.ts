import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';
import { Node } from '@solana-suite/shared';

describe('Metaplex.find', () => {
  it('Find owner info', async () => {
    Node.changeConnection({
      customClusterUrl: [
        'https://sparkling-ancient-snow.solana-devnet.discover.quiknode.pro/caf0ca64ee225f376da0d05ef893c57a2b6644a7/',
      ],
    });
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';
    // const owner = 'BAWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
    const res = await Metaplex.findByOwner2(owner);
    console.log(res);
  });

  it('Find owner info', async () => {
    // const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';
    const owner = 'BAWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
    const res = await Metaplex.findByOwner(owner);
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

  it('Find owner info, many info', async () => {
    const owner = '6yVHt5qgGnGZ3rGJoX9dX5zKpWgvmz5rLgzco77HiW2H';
    const res = await Metaplex.findByOwner(owner);
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
