import {Constants} from '../src';

describe('Constants', () => {
  it('Load current network file', () => {
    const current = Constants.loadNetworkFile();
    console.log(current);
  });
})
