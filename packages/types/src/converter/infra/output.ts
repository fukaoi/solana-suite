import { PublicKey } from '@solana/web3.js';
import { InfraInput } from '../infra/input';
import { Common } from '../common';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

export namespace InfraOutput {
  export type Collection = {
    verified: boolean;
    key: PublicKey;
  };

  export type OnchainAndOffchain = {
    onchain: Metadata;
    offchain: InfraOutput.Offchain;
  };

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

  export type Creator = InfraInput.Creators;
  export type Offchain = InfraInput.Offchain;
  export type Uses = Common.Uses;
}
