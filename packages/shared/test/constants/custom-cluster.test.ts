import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { execSync } from 'child_process';

const customClusterUrl = ['https://hoge.hoge', 'https://fuga.fuga'];

describe('Constants', () => {
  beforeAll(() => {
    console.log('# PWD: ', process.env.PWD);
    // add custom cluster url
    const buffer = execSync(
      `NODE_ENV=standalone ./solana-suite-config.mjs -cc ${customClusterUrl.join(
        ' ',
      )}`,
    );
    console.log('# buffer: ', buffer.toString());
  });

  afterAll(() => {
    // revert file
    execSync('git checkout src/solana-suite.json');
  });

  it('Constants use multiple customUrls', async () => {
    // call lazy constants module
    await import('../../src/constants').then(async (obj) => {
      for (let i = 0; i < 10; i++) {
        const cluster = obj.Constants.switchCluster({ customClusterUrl });
        console.log('# switch cluster url: ', cluster);
        expect(customClusterUrl.includes(cluster)).toBe(true);
        await import('../../src/global').then(async (obj) => obj.sleep(1));
      }
    });
  });

  // it.skip('Constants use multiple customUrls from solana-suite.json', async () => {
  //   // call lazy node module
  //   await import('../../src/node').then(async (obj) => {
  //     for (let i = 0; i < 10; i++) {
  //       const cluster = obj.Node.getConnection().rpcEndpoint;
  //       console.log('# rpcEndpoint url: ', cluster);
  //       expect(customClusterUrl.includes(cluster)).toBe(true);
  //       await import('../../src/global').then(async (obj) => obj.sleep(1));
  //     }
  //   });
  // });
});
