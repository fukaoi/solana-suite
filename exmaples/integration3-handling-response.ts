//////////////////////////////////////////////
//$ npx ts-node exmaples/integration3-handling-response
//////////////////////////////////////////////

import {
  Wallet,
  Result
} from '../src/index';

const DEMO_ADDRESS = 'AorMYhBGmqo8Czp65WLjA42vKaQ5jS69gxyk6KxAsK3x';

(async () => {

  // success, ok  => ex1.value
  // failed,  err => ex1.error

  //////////////////////////////////////////////
  // Example1 type guard
  //////////////////////////////////////////////
  const ex1 = await Wallet.getBalance(DEMO_ADDRESS.toPubKey());
  ex1.isOk && console.log('# ex1: ', ex1.value);

  if (ex1.isOk) {
    console.log('# ex1: ', ex1.value);
  } else if(ex1.isErr) {
    console.log('# ex1 error: ', ex1.error);
  }

  //////////////////////////////////////////////
  // Exmaple2 unwrap
  //////////////////////////////////////////////
  const ex2 = await Wallet.getBalance(DEMO_ADDRESS.toPubKey());
  console.log('# ex2: ', ex2.unwrap());


  //////////////////////////////////////////////
  // Exmaple3 explicit define type
  //////////////////////////////////////////////
  const ex3 = await Wallet.getBalance(DEMO_ADDRESS.toPubKey());

  const casted = (<Result.Ok<number, Error>>ex3).value;
  console.log('# ex3: ', casted);

})();
