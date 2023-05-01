import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';
import { Node } from '@solana-suite/shared';
import { Sortable } from '../../src/metaplex/find';
import { UserSideOutput } from '@solana-suite/shared-metaplex';

describe('Metaplex.find', () => {
  it('Find owner info', async () => {
    console.log('#Normal: ');
    const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
    await Metaplex.findByOwner(
      owner,
      (data: UserSideOutput.NftMetadata[], err?: Error) => {
        console.log(data);
        console.error(err);
      }
    );
  });

  // it('Find owner info with Desc', async () => {
  //   console.log('#Desc: ');
  //   // Node.changeConnection({
  //   //   customClusterUrl: [
  //   //     'https://sparkling-ancient-snow.solana-devnet.discover.quiknode.pro/caf0ca64ee225f376da0d05ef893c57a2b6644a7/',
  //   //   ],
  //   // });
  //   // const owner = 'HAjRB3jEdBDcmqnXuZcwMNZUZ92XpkKjN4GTVuvKwsBK';
  //   // const owner = 'BAWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
  //   const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
  //   const res = await Metaplex.findByOwner(owner, Sortable.Desc);
  //   console.log(res);
  // });

  // it.only('Find owner info with Asc', async () => {
  //   console.log('#Asc: ');
  //   // Node.changeConnection({
  //   //   customClusterUrl: [
  //   //     'https://sparkling-ancient-snow.solana-devnet.discover.quiknode.pro/caf0ca64ee225f376da0d05ef893c57a2b6644a7/',
  //   //   ],
  //   // });
  //   // const owner = 'HAjRB3jEdBDcmqnXuZcwMNZUZ92XpkKjN4GTVuvKwsBK';
  //   // const owner = 'BAWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
  //   const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
  //   const res = await Metaplex.findByOwner(owner, Sortable.Asc);
  //   console.log(res);
  // });

  // it.skip('Find owner info', async () => {
  //   // const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu';
  //   const owner = 'BAWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
  //   const res = await Metaplex.findByOwner(owner);
  //   res.match(
  //     (ok) => {
  //       assert.isTrue(ok.length > 0);
  //       console.log('# find owner info: ', ok);
  //     },
  //     (err) => {
  //       assert.fail(err.message);
  //     }
  //   );
  // });
  //
  // it.skip('Find owner info, many info', async () => {
  //   const owner = '6yVHt5qgGnGZ3rGJoX9dX5zKpWgvmz5rLgzco77HiW2H';
  //   const res = await Metaplex.findByOwner(owner);
  //   res.match(
  //     (ok) => {
  //       assert.isTrue(ok.length > 0);
  //       console.log('# find owner info: ', ok);
  //     },
  //     (err) => {
  //       assert.fail(err.message);
  //     }
  //   );
  // });
});
