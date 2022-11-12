import { Node, Result, Instruction, Try } from '@solana-suite/shared';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Multisig as MultisigInstruction } from './instruction';

export namespace Multisig {
  export const create = async (
    m: number,
    feePayer: Keypair,
    signerPubkey: PublicKey[]
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      if (m > signerPubkey.length) {
        throw Error('signers number less than m number');
      }

      const account = Keypair.generate();
      const connection = Node.getConnection();
      const balanceNeeded = await connection.getMinimumBalanceForRentExemption(
        MultisigInstruction.Layout.span
      );

      const inst1 = MultisigInstruction.account(
        account,
        feePayer,
        balanceNeeded
      );

      const inst2 = MultisigInstruction.multisig(m, account, signerPubkey);

      return new Instruction(
        [inst1, inst2],
        [account],
        feePayer,
        account.publicKey.toBase58()
      );
    });
  };
}
