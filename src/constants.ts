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
  export const SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
  export const SPL_ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo';
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
  export const COMMITMENT: Commitment = 'singleGossip';
}

