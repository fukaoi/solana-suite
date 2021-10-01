import '../src/util';

describe('Util', () => {
  it('console.debug', () => {
    console.debug('call console.debug');
  });

  it('Change type', () => {
    console.debug("data".toPubKey());
  });
})
