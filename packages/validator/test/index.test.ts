import test from 'ava';
import { Validator } from '../src/';

test('[Success]isRoyalty', async (t) => {
  const res = Validator.isRoyalty(30);
  t.true(res.isOk);
});

test('[Success]isRoyalty: zero number', async (t) => {
  const res = Validator.isRoyalty(0);
  t.true(res.isOk);
});

test('[Error]isRoyalty: too small number', async (t) => {
  const res = Validator.isRoyalty(-1);
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.SMALL_NUMBER));
      t.true(Array.isArray(err.details));
    },
  );
});

test('[Error]isRoyalty: too big number', async (t) => {
  const res = Validator.isRoyalty(200);
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.BIG_NUMBER));
    },
  );
});

test('[Error]isRoyalty: empty value', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(parseInt(''));
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.EMPTY));
    },
  );
});

test('[Success]isSellerFeeBasisPoints', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(3000);
  t.true(res.isOk);
});

test('[Success]isSellerFeeBasisPoints: zero number', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(0);
  t.true(res.isOk);
});

test('[Error]isSellerFeeBasisPoints: too small number', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(-1);
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.SMALL_NUMBER));
      t.true(Array.isArray(err.details));
    },
  );
});

test('[Error]isSellerFeeBasisPoints: too big number', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(20000);
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.BIG_NUMBER));
    },
  );
});

test('[Error]isSellerFeeBasisPoints: empty value', async (t) => {
  const res = Validator.isSellerFeeBasisPoints(parseInt(''));
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.EMPTY));
    },
  );
});

test('[Success]isName', async (t) => {
  const res = Validator.isName('name');
  t.true(res.isOk);
});

test('[Error]isName: too long length', async (t) => {
  const res = Validator.isName('long-long-name-long-long-name-long-long-name');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.LONG_LENGTH));
    },
  );
});

test('[Error]isName: empty value', async (t) => {
  const res = Validator.isName('');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.EMPTY));
    },
  );
});

test('[Success]isSymbol', async (t) => {
  const res = Validator.isSymbol('SYMBOL');
  t.true(res.isOk);
});

test('[Error]isSymbol: too long length', async (t) => {
  const res = Validator.isSymbol('LONG-LONG-SYMBOL');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.LONG_LENGTH));
    },
  );
});

test('[Error]isSymbol: empty value', async (t) => {
  const res = Validator.isName('');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.EMPTY));
    },
  );
});

test('[Success]isImageUrl', async (t) => {
  const res = Validator.isImageUrl(
    'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
  );
  t.true(res.isOk);
});

test('[Error]isImageUrl: empty value', async (t) => {
  const res = Validator.isImageUrl('');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.EMPTY));
    },
  );
});

test('[Error]isImageUrl: invalid value', async (t) => {
  const res = Validator.isImageUrl('invalid url');
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.INVALID_URL));
    },
  );
});

test('[Error]isImageUrl: too long length', async (t) => {
  const res = Validator.isImageUrl(`https://example.com/${'x'.repeat(200)}`);
  res.match(
    () => t.fail('No come here'),
    (err) => {
      t.regex(err.message, RegExp(Validator.Message.LONG_LENGTH));
    },
  );
});

test('[Success]checkAll', async (t) => {
  const data = {
    name: 'name',
    seller_fee_basis_points: 50,
    royalty: 0,
    symbol: 'SYMBOL',
    image: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
  };
  const res = Validator.checkAll(data);
  t.log(res);
  t.true(res.isOk);
});

test('[Error]checkAll', async (t) => {
  const data = {
    name: '',
    uri: '',
    seller_fee_basis_points: 15000,
    symbol: 'LONG-SYMBOL-LONG-SYMBOL',
    image: `https://example.com/${'x'.repeat(200)}`,
    filePath: '',
    sellerFeeBasisPoints: -10,
  };
  const res = Validator.checkAll(data);
  res.match(
    () => t.fail('Unexpected Error'),
    (err) => t.not(err.details, ''),
  );
});
