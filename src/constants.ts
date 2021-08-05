import {
  Commitment
} from '@solana/web3.js';

export namespace ConstantsFunc {
  export const switchEnvParam = (env: string | undefined) => {
    const response = {url: ''};
    switch (env) {
      case 'development':
        response.url = 'https://api.devnet.solana.com';
        break;
      case 'production':
        response.url = 'https://api.solana.com';
        break;
      default:
        response.url = 'https://api.devnet.solana.com';
    }
    return response;
  }
}

export namespace Constants {
  export const API_URL = ConstantsFunc.switchEnvParam(process.env.NODE_ENV).url;
  export const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
  export const MEMO_PROGRAMID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo';
  export const COMMITMENT: Commitment = 'singleGossip';
}

