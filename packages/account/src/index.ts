import { Account as Associated } from './associated';
import { Account as Keypair } from './keypair';
import { Account as Pda } from './pda';

export const Account = {
  ...Associated,
  ...Keypair,
  ...Pda,
};
