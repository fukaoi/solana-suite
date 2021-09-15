import {
  Commitment
} from '@solana/web3.js';

export namespace ConstantsFunc {
  export const switchEnvParam = (env: string | undefined) => {
    const response = {url: ''};
    switch (env) {
      case 'development':
        response.url = 'http://api.devnet.solana.com';
        break;
      case 'production':
        response.url = 'https://api.solana.com';
        break;
      default:
        response.url = 'http://api.devnet.solana.com';
    }
    return response;
  }
}

export namespace Constants {
  export const API_URL = ConstantsFunc.switchEnvParam(process.env.NODE_ENV).url;
  export const SYSTEM_PROGRAM_ID = '11111111111111111111111111111111';
  export const SPL_TOKEN_PROGRAM_ID = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA';
  export const SPL_ASSOCIATED_TOKEN_PROGRAM_ID = 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
  export const MEMO_PROGRAM_ID = 'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo';
  export const METAPLEX_PROGRAM_ID = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
  export const COMMITMENT: Commitment = 'singleGossip';
  // todo: this NFT_STORAGE_API_KEY moved .env file
  // NFT.storage can store NFTs up to 32GB in size!
  export const NFT_STORAGE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
}

