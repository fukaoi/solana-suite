import {AccountLayout, MintLayout, Token} from '@solana/spl-token';
import {
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
} from '@solana/web3.js';

import {Util} from './src/util';
import {Transaction} from './src/transaction';

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

const createUninitializedMint = (
  instructions: TransactionInstruction[],
  payer: PublicKey,
  amount: number,
  signers: Keypair[],
) => {
  const account = Keypair.generate();
  instructions.push(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: account.publicKey,
      lamports: amount,
      space: MintLayout.span,
      programId: TOKEN_PROGRAM_ID,
    }),
  );

  signers.push(account);

  return account.publicKey;
}

const createMint = (
  instructions: TransactionInstruction[],
  payer: PublicKey,
  mintRentExempt: number,
  decimals: number,
  owner: PublicKey,
  freezeAuthority: PublicKey,
  signers: Keypair[],
) => {
  const account = createUninitializedMint(
    instructions,
    payer,
    mintRentExempt,
    signers,
  );

  console.log(signers[0].publicKey.toBase58());

  instructions.push(
    Token.createInitMintInstruction(
      TOKEN_PROGRAM_ID,
      account,
      decimals,
      owner,
      freezeAuthority,
    ),
  );

  return account;
}


const main = async () => {
  console.log('#### test exec start ####');
  const instructions: TransactionInstruction[] = [];
  const payer = new PublicKey('DaTm7mPibeigCTiesJUpmxXYkf9T77JK4jgvH76vtYuP');
  const freezeAuthority = payer;
  const owner = payer;
  const decimals = 1;
  const signers = [Util.createKeypair('2dQ7NGx7f3bNXgJsytZX2SFD3cyzo5FzN5UrwVZz2xrYT65ucBZaNXUSdc3hme2GmA7xPpizaYDT42eGsvDdTp7T')];

  const mintRentExempt = await Util.getConnection().getMinimumBalanceForRentExemption(
    MintLayout.span,
  );

  const mintKey = createMint(
    instructions,
    payer,
    mintRentExempt,
    decimals,
    owner,
    freezeAuthority,
    signers
  ).toBase58();
  console.log('#mintRentExempt: ', mintRentExempt);
  console.log('#mintKey: ', mintKey,);
  console.log('#signers: ', signers[0].publicKey.toBase58(), signers[1].publicKey.toBase58());

  const res = await Transaction.sendMySelf(signers, instructions);
  console.log(res);
}

main();
