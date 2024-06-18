declare const pubKeyNominality: unique symbol;
type Pubkey =
  | (string & {
      [pubKeyNominality]: never;
    })
  | string;

declare const requestSol: (pubkey: Pubkey, sol?: number) => Promise<void>;

export { requestSol };
