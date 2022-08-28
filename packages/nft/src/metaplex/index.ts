import { PublicKey } from '@solana/web3.js';

import {Metaplex as MetaplexMint} from './mint';
import {Metaplex as MetaplexFind} from './find';

export module Metaplex {
  export const findByOwner = (owner) =>
    MetaplexFind.findByOwner(owner);

  export const mint = async (
    metadata: NftStorageMetaplexMetadata,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<Instruction, Error | ValidatorError>> => {
}


