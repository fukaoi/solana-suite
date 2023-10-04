export type OnOk<T extends History> = (ok: T[]) => void;
export type OnErr = (err: Error) => void;

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
  tokenAmount?: string;
  memo?: string;
  dateTime?: Date;
  type?: string;
  sig?: string;
  innerInstruction?: boolean;
};
