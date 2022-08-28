import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
import { Nft } from '@metaplex-foundation/js';

export namespace Metaplex {
  export const findByOwner = (
    owner: PublicKey
  ): Promise<Result<Nft[], Error>> =>
    Bundlr.make()
      .nfts()
      .findAllByOwner(owner)
      .then(Result.ok)
      .catch(Result.err);
}
