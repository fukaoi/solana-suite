import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {Memo} from '../src/memo';
import {assert, expect} from 'chai';

const SIG = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy'

describe('Transaction', () => {
  // it('Get transaction data', async () => {
    // const res = await Transaction.get(SIG);
    // assert.isObject(res);
  // });

  it('Transaction decode memo', async () => {
    const res = await Transaction.get(SIG);
    // console.log(res?.transaction.message.instructions[0]);
    const m = Memo.createInstruction('U1Gg9T9EGN5tDRw28wR3GxXWZBkoS3rg2U3iMZdViMJhd5pVNsxh79RW');
    console.log(Memo.decode(m));
    // const data = res.transaction.message.instructions[0].data;
    // const data = '34CCVB3fVcHrwDmKDYkYhX1Kva4cJXoNGwYrZWNSYc7vKqdPhRsTmhd3h6';
    // const res2 = Memo.decode(data);
    // console.log(`# decode: `, res2);
    // expect(res).to.equal(DUMMY_DATA);
  });
})
