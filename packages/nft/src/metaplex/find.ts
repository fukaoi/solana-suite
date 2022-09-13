import { PublicKey } from '@solana/web3.js';
import { Result } from '@solana-suite/shared';
import { Bundlr } from '../bundlr';
import { OutputMetaplexMetadata } from '../types/metaplex/index';

export namespace Metaplex {
  export const findByOwner = async (
    owner: PublicKey
  ): Promise<Result<OutputMetaplexMetadata[], Error>> => {
    // ) => {
    const allData = await Bundlr.make()
      .nfts()
      .findAllByOwner({owner})
      .run()
      .then(Result.ok)
      .catch(Result.err);

    if (allData.isErr) {
      return Result.err(allData.error);
    }

    console.log(allData);
    // const res = allData.unwrap().map((d) => {
    //   return {
    //     mint: d.mint.toString(),
    //     updateAuthority: d.updateAuthority.toString(),
    //     name: d.name,
    //     symbol: d.symbol,
    //     uri: d.uri,
    //     royalty: d.sellerFeeBasisPoints,
    //     creators: d.creators,
    //     isMutable: d.isMutable,
    //     editionNonce: d.editionNonce,
    //     tokenStandard: d.tokenStandard,
    //     collection: d.collection,
    //     primarySaleHappened: d.primarySaleHappened,
    //     uses: d.uses,
    //   };
    // });
    // return Result.ok(res);
    return Result.ok([]);
  };
}
