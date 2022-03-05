

function data(z:number, ...v: {first: number, second: number}[]) {
  console.log('z:', z);
  console.log('v:', v);
  console.log(v.length);
}


data(1, {first: 100, second: 2000});
data(8);
