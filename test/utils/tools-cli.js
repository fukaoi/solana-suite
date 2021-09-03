/*
 * Usage: npx ts-node test/utils/tools-cli.js --help
 */

const cli = require('cac')();
const bs = require('bs58');
const {Keypair} = require('@solana/web3.js');
const {Wallet} = require('../../src/wallet');

const takePubKey = (secret) => {
  const res = Keypair.fromSecretKey(secret);
  console.log(`\u001b[33m[keypair publicKey]  \u001b[31m`, res.publicKey.toBase58());
}
const completeBuffer = (buf) => JSON.stringify(buf)

cli.command('enc <135, 40, 29, 113>', 'secret key of Byte string').action((bufferString) => {
  const arr = bufferString.split(',');
  const uint8 = new Uint8Array(arr);
  const secret = bs.encode(uint8);
  console.log(`\u001b[34m[encode base58] \u001b[32m`, completeBuffer(secret));
  takePubKey(uint8);
});

cli.command('dec <base58 string>', 'encoded secret key').action((encodedData) => {
  const secret = bs.decode(encodedData);
  console.log(`\u001b[34m[decode base58] \u001b[32m`, completeBuffer(secret));
  takePubKey(secret);
});

cli.command('dec-memo <base58 string>', 'encoded memo data').action((encodedData) => {
  const memo = bs.decode(encodedData);
  console.log(`\u001b[34m[decode memo base58] \u001b[32m`, memo.toString());
});

cli.command('findAccount <wallet> <tokenId>').action(async(walletAddress, tokenId) => {
   const res = await Wallet.findAssocaiatedTokenAddress(walletAddress, tokenId);
  console.log(`\u001b[34m[result] \u001b[32m ${res.toBase58()}`);

});

cli.command('findMetaplex <wallet> <tokenId>').action(async(walletAddress, tokenId) => {
   const res = await Wallet.findMetaplexAssocaiatedTokenAddress(walletAddress, tokenId);
  console.log(`\u001b[34m[result] \u001b[32m ${res.toBase58()}`);

});



cli.help();
cli.parse();
