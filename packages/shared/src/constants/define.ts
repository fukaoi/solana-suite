import { Commitment, PublicKey } from '@solana/web3.js';
import { ConstantsFunc } from '../constants-func/switch-bundlr';
import '../global';
import Config from '../solana-suite.json';

export namespace Constants {
  String.prototype.toPublicKey = function () {
    return new PublicKey(this);
  };
  export const WRAPPED_TOKEN_PROGRAM_ID =
    'So11111111111111111111111111111111111111112'.toPublicKey();
  export const MEMO_PROGRAM_ID =
    'Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo'.toPublicKey();
  export const METAPLEX_PROGRAM_ID =
    'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'.toPublicKey();
  export const COMMITMENT: Commitment = 'confirmed';
  export const NFT_STORAGE_API_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE';
  export const NFT_STORAGE_GATEWAY_URL = 'https://ipfs.io/ipfs';
  export const BUNDLR_NETWORK_URL = ConstantsFunc.switchBundlr(
    Config.cluster.type
  );
}
