import {
  AccountInfo,
  Token,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';


import {
  PublicKey,
  Signer,
} from '@solana/web3.js';

// import {Node, Result, Instruction, sleep} from '@solana-suite/shared';
import {Node, Result, Instruction, sleep} from '../../shared/src/';

export namespace SplToken {

  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;
  const RETREY_OVER_LIMIT = 10;
  const RETREY_SLEEP_TIME = 3000;

  export const retryGetOrCreateAssociatedAccountInfo = async (
    token: Token,
    owner: PublicKey
  ): Promise<Result<AccountInfo, Error>> => {
    let counter = 1;
    while (counter < RETREY_OVER_LIMIT) {
      try {
        const accountInfo = await token.getOrCreateAssociatedAccountInfo(owner) as AccountInfo
        console.log('# associatedAccountInfo: ', accountInfo.mint.toString());
        return Result.ok(accountInfo);
      } catch (e) {
        console.log(`# retry: ${counter} getOrCreateAssociatedAccountInfo`, e);
      }
      sleep(RETREY_SLEEP_TIME);
      counter++;
    }
    return Result.err(Error(`retry action is over limit ${RETREY_OVER_LIMIT}`));
  }

  export const mint = async (
    owner: PublicKey,
    signers: Signer[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const tokenRes = await Token.createMint(
      Node.getConnection(),
      feePayer,
      owner,
      owner,
      mintDecimal,
      TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.err);

    if (tokenRes.isErr) {
      return Result.err(tokenRes.error);
    }

    const token = tokenRes.value;

    const tokenAssociated = await retryGetOrCreateAssociatedAccountInfo(token, owner);

    if (tokenAssociated.isErr) {
      return Result.err(tokenAssociated.error);
    }

    const inst = Token.createMintToInstruction(
      TOKEN_PROGRAM_ID,
      token.publicKey,
      tokenAssociated.value.address,
      owner,
      signers,
      totalAmount
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer,
        token.publicKey.toBase58()
      )
    );
  }

  export const transfer = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    amount: number,
    mintDecimal: number,
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {

    !feePayer && (feePayer = signers[0]);

    const token = new Token(
      Node.getConnection(),
      tokenKey,
      TOKEN_PROGRAM_ID,
      feePayer
    );

    const sourceToken = await retryGetOrCreateAssociatedAccountInfo(token, owner);
    if (sourceToken.isErr) {
      return Result.err(sourceToken.error);
    }

    const destToken = await retryGetOrCreateAssociatedAccountInfo(token, dest);
    if (destToken.isErr) {
      return Result.err(destToken.error);
    }

    const inst = Token.createTransferCheckedInstruction(
      TOKEN_PROGRAM_ID,
      sourceToken.value.address,
      tokenKey,
      destToken.value.address,
      owner,
      signers,
      amount,
      mintDecimal
    );

    return Result.ok(
      new Instruction(
        [inst],
        signers,
        feePayer
      ));
  }

  export const transferNft = async (
    tokenKey: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Signer[],
    feePayer?: Signer,
  ): Promise<Result<Instruction, Error>> => {
    return transfer(
      tokenKey,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  }
}
