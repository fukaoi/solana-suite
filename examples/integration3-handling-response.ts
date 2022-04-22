//////////////////////////////////////////////
// $ npx ts-node examples/integration3-handling-response
//////////////////////////////////////////////

import {
  Account,
} from '@solana-suite/core';

import {
  Result,
} from '@solana-suite/shared';


const DEMO_ADDRESS = 'AorMYhBGmqo8Czp65WLjA42vKaQ5jS69gxyk6KxAsK3x';

(async () => {

  // success, ok  => ex1.value
  // failed,  err => ex1.error

  //////////////////////////////////////////////
  // Example1 type guard
  //////////////////////////////////////////////
  const ex1 = await Account.getBalance(DEMO_ADDRESS.toPublicKey());
  ex1.isOk && console.log('# ex1: ', ex1.value);

  if (ex1.isOk) {
    console.log('# ex1: ', ex1.value);
  } else if (ex1.isErr) {
    console.log('# ex1 error: ', ex1.error);
  }

  //////////////////////////////////////////////
  // Exmaple2 unwrap
  //////////////////////////////////////////////
  const ex2 = await Account.getBalance(DEMO_ADDRESS.toPublicKey());
  console.log('# ex2: ', ex2.unwrap());


  //////////////////////////////////////////////
  // Exmaple3 explicit define type
  //////////////////////////////////////////////
  const ex3 = await Account.getBalance(DEMO_ADDRESS.toPublicKey());

  const casted = (ex3 as Result.Ok<number, Error>).value;
  console.log('# ex3: ', casted);


  //////////////////////////////////////////////
  // Exmaple4 map()
  //////////////////////////////////////////////
  const ex4 = await Account.getBalance(DEMO_ADDRESS.toPublicKey());

  const mapped = ex4.map(
    (value: number) => value * 1000,
    (error: Error) => new Error(error.message)
  ).unwrap();
  console.log('# ex4: ', mapped);


  //////////////////////////////////////////////
  // Exmaple5 match()
  //////////////////////////////////////////////
  const ex5 = await Account.getBalance(DEMO_ADDRESS.toPublicKey());

  ex5.match(
    (value: number) => console.log('# ex5: ', value),
    (error: Error) => console.error(error)
  );

})();
