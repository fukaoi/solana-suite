import test from 'ava';
import { execSync } from 'child_process';

test('exec solana-suite-config script', (t) => {
  const res = execSync('pnpm tsx ./src/config-script.ts -s');
  t.log(res.toString());
  t.pass();
});  

// test('set filebase parameter', (t) => {
//   const res = execSync('pnpm tsx ./src/config-script.ts -f key secret');
//   t.log(res.toString());
//   t.pass();
// }); 
