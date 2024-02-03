import { Account as Aassociated } from './associated';
import { Account as Keypair } from './keypair';
import { Account as Pda } from './pda';
import '~/types/global';
// import '~/global';

export const Account = {
  ...Aassociated,
  ...Keypair,
  ...Pda,
};
