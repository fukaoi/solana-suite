import { Pubkey } from '@solana-suite/shared';

export namespace UserSideOutput {
  export type History = {
    sol?: string;
    account?: string;
    destination?: Pubkey;
    source?: Pubkey;
    authority?: Pubkey;
    multisigAuthority?: Pubkey;
    signers?: Pubkey[];
    mint?: Pubkey;
    mintAuthority?: Pubkey;
    tokenAmount?: {
      amount: string;
      decimals: number;
      uiAmount: number;
      uiAmountString: string;
    };
    memo?: string;
    date?: Date;
    type?: string;
    sig?: string;
    innerInstruction?: boolean;
  };
}
