import { PublicKey, Keypair } from '@solana/web3.js';
import {
  Instruction,
  Result,
  PartialSignInstruction,
} from '@solana-suite/shared';
import { SplToken } from '@solana-suite/core';

export namespace Metaplex {
  const NFT_AMOUNT = 1;
  const NFT_DECIMALS = 0;

  export const transfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return SplToken.transfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };

  export const feePayerPartialSignTransferNft = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    feePayer: PublicKey
  ): Promise<Result<PartialSignInstruction, Error>> => {
    return SplToken.feePayerPartialSignTransfer(
      mint,
      owner,
      dest,
      signers,
      NFT_AMOUNT,
      NFT_DECIMALS,
      feePayer
    );
  };
}
