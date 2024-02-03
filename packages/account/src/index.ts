import { Account as Keypair } from './keypair';
import { Account as Pda } from './pda';

export const Account = {
  ...Keypair,
  ...Pda,
};
