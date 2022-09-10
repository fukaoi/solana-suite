import { createMint, createMintToCheckedInstruction } from '@solana/spl-token';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Node, Result, Instruction } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
import { Internals_SplToken } from '../internals/_spl-token';

export namespace SplToken {
  export const mint = async (
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Keypair,
  ): Promise<Result<Instruction, Error>> => {
    !feePayer && (feePayer = signers[0]);

    const connection = Node.getConnection();
    const tokenRes = await createMint(
      connection,
      feePayer,
      owner,
      owner,
      mintDecimal
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated =
      await AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        feePayer
      );

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = createMintToCheckedInstruction(
      token,
      tokenAssociated.value.toPublicKey(),
      owner,
      Internals_SplToken.calculateAmount(totalAmount, mintDecimal),
      mintDecimal,
      signers
    );

    return Result.ok(
      new Instruction([inst], signers, feePayer, token.toBase58())
    );
  };
}
