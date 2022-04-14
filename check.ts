import {
  Token,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from '@solana/spl-token';

import {
  PublicKey
} from '@solana/web3.js';

const tokenKey = new PublicKey('4zD94517j7KFBZtniz77ZQzQj6kwxVwTwXVPxBLdsXMC');
const user = new PublicKey('D9y4yvCGUbnk9brTbYaExgRdgSwh17aykaCHZqRgBa3i');

const main = async () => {
  const associatedAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenKey, user);
  console.log(associatedAddress.toBase58());
}

main();
