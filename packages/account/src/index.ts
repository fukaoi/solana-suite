import { Account as Keypair } from './keypair';
import { Account as Pda } from './pda';
import '~/types/global';
// import '~/global';

export const Account = {
  ...Keypair,
  ...Pda,
};
