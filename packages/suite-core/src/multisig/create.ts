import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Keypair } from '@solana/web3.js';
import { Multisig as _Instruction } from './instruction';
import { Pubkey, Secret } from '~/types/account';
import { Instruction } from '~/instruction';

export namespace Multisig {
  export const create = async (
    m: number,
    feePayer: Secret,
    signerPubkeys: Pubkey[],
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      if (m > signerPubkeys.length) {
        throw Error('signers number less than m number');
      }

      const account = Keypair.generate();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        _Instruction.Layout.span,
      );

      const inst1 = _Instruction.account(
        account,
        feePayer.toKeypair(),
        balanceNeeded,
      );

      const inst2 = _Instruction.multisig(
        m,
        account,
        signerPubkeys.map((pubkey: Pubkey) => pubkey.toPublicKey()),
      );

      return new Instruction(
        [inst1, inst2],
        [account],
        feePayer.toKeypair(),
        account.publicKey.toString(),
      );
    });
  };
}
