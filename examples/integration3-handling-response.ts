//////////////////////////////////////////////
// $ npx ts-node examples/integration3-handling-response
//////////////////////////////////////////////

import {
  SolNative, SolNativeOwnerInfo,
} from '@solana-suite/core';


const DEMO_ADDRESS = 'AorMYhBGmqo8Czp65WLjA42vKaQ5jS69gxyk6KxAsK3x';

(async () => {

  // success, ok  => ex1.value
  // failed,  err => ex1.error

  //////////////////////////////////////////////
  // Example1 type guard
  //////////////////////////////////////////////
  const ex1 = await SolNative.findByOwner(DEMO_ADDRESS.toPublicKey());
  ex1.isOk && console.log('# ex1: ', ex1.value);

  if (ex1.isOk) {
    console.log('# ex1: ', ex1.value);
  } else if (ex1.isErr) {
    console.log('# ex1 error: ', ex1.error);
  }

  //////////////////////////////////////////////
  // Example2 unwrap
  //////////////////////////////////////////////
  const ex2 = await SolNative.findByOwner(DEMO_ADDRESS.toPublicKey());
  console.log('# ex2: ', ex2.unwrap());


  //////////////////////////////////////////////
  // Example3 map()
  //////////////////////////////////////////////
  const ex4 = await SolNative.findByOwner(DEMO_ADDRESS.toPublicKey());

  const mapped = ex4.map(
    (value: SolNativeOwnerInfo) => value.sol * 100,
    (error: Error) => new Error(error.message)
  ).unwrap();
  console.log('# ex4: ', mapped);


  //////////////////////////////////////////////
  // Example4 match()
  //////////////////////////////////////////////
  const ex5 = await SolNative.findByOwner(DEMO_ADDRESS.toPublicKey());

  ex5.match(
    (value: SolNativeOwnerInfo) => console.log('# ex5: ', value),
    (error: Error) => console.error(error)
  );

})();
