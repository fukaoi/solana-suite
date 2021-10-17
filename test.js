
const myPromiseOk = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("OK"));
  }, 300)
});
const myPromiseOk2 = () => new Promise((resolve, reject) => {
  throw (new Error("OK2"));
});

const myPromiseNg2 = () => {
  setTimeout(() => {
    throw (new Error("NG"));
  }, 300)
};

const main = async () => {
  // const res = await myPromiseOk().catch(
  // e => {
  // return e.message;
  // }
  // );
  // console.warn(`res: ${res}`)
  const res2 = await myPromiseOk2().catch(
    e => {
      return e.message;
    }
  );
  console.warn(`res2: ${res2}`)
  try {
    await myPromiseNg2();
  } catch (e) {
    console.log(`try catched: ${e}`);
  }
}

main();
