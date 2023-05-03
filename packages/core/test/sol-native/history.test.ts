import { describe, it } from 'mocha';
import { SolNative } from '../../src';
import { assert } from 'chai';
import { DirectionFilter, Filter } from '../../src/types/history';

const target = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk';

describe('SolNative', () => {
  it('Get transfer history with set optional filter', async () => {
    await SolNative.getHistory(
      target,
      (result) => {
        result.match(
          (ok) => {
            console.log('# SolNative.getHistory#1: ', ok);
            ok.forEach((res) => {
              assert.isNotEmpty(res.type);
              assert.isNotEmpty(res.info.mint);
              assert.isNotEmpty(res.info.mintAuthority);
              assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      {
        actionFilter: [Filter.MintTo],
      }
    );
  });

  it('Get transfer history with transfer destination filter', async () => {
    await SolNative.getHistory(
      target,
      (result) => {
        result.match(
          (ok) => {
            console.log('# SolNative.getHistory#2: ', ok);
            ok.forEach((res) => {
              assert.isNotEmpty(res.type);
              assert.isNotEmpty(res.info.destination);
              assert.isNotEmpty(res.info.source);
              assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      {
        directionFilter: DirectionFilter.Dest,
      }
    );
  });

  it('Get transfer history with transfer source filter', async () => {
    await SolNative.getHistory(
      target,
      (result) => {
        result.match(
          (ok) => {
            console.log('# SolNative.getHistory#3: ', ok);
            ok.forEach((res) => {
              assert.isNotEmpty(res.type);
              assert.isNotEmpty(res.info.destination);
              assert.isNotEmpty(res.info.source);
              assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      {
        directionFilter: DirectionFilter.Source,
      }
    );
  });

  it('Get transfer history by address', async () => {
    const target = 'HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw';
    await SolNative.getHistory(target, (result) => {
      result.match(
        (ok) => {
          ok.forEach((res) => {
            console.log(res);
            assert.isNotEmpty(res.type);
            assert.isNotEmpty(res.info.amount);
            assert.isNotEmpty(res.info.destination);
            assert.isNotEmpty(res.info.source);
            assert.isNotNull(res.date);
          });
        },
        (err) => assert.fail(err.message)
      );
    });
  });
});
