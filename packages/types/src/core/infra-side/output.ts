import { Pubkey } from '../../account';
import { PublicKey } from '@solana/web3.js';

export namespace CoreInfraSideOutput {
  export type Transfer = {
    parsed: {
      info: {
        destination: Pubkey;
        source: Pubkey;
        lamports: number;
      };
      type: string;
    };
    program: string;
    programId?: PublicKey;
  };

  export type MintTo = {
    parsed: {
      info: {
        account: Pubkey;
        mint: Pubkey;
        mintAuthority: Pubkey;
        tokenAmount: string;
      };
      type: string;
    };
    program: string;
    programId?: PublicKey;
  };

  export type MintToChecked = MintTo;

  export type TransferChecked = {
    parsed: {
      info: {
        destination: Pubkey;
        mint: Pubkey;
        multisigAuthority: Pubkey;
        signers: Pubkey[];
        source: Pubkey;
        tokenAmount: string;
      };
      type: string;
    };
    program: string;
    programId?: PublicKey;
  };

  export type Memo = {
    parsed: string;
    program: string;
    programId: PublicKey;
  };
}
