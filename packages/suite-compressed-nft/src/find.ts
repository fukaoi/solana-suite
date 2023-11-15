import { Converter } from '~/converter';
import { DasApi } from '~/das-api';
import { Try } from '~/shared';
import { Offchain } from '~/types/storage';

export namespace CompressedNft {
  //@internal
  export const fetchOffchain = async (uri: string) => {
    const json = await (await fetch(uri)).json();
    return json;
  };

  export const findByOwner = async (
    owner: Pubkey,
    limit: number = 1000,
    page: number = 1,
    sortBy?: any,
    before?: string,
    after?: string,
    // ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
  ) => {
    return Try(async () => {
      const assets = await DasApi.getAssetsByOwner(
        owner,
        limit,
        page,
        sortBy,
        before,
        after,
      );
      if (assets.isErr) {
        throw assets.error;
      }

      return await Promise.all(
        assets.value.items.map(async (item) => {
          const offchain: Offchain = await fetchOffchain(item.content.json_uri);
          const merged = { onchain: item, offchain: offchain };
          return Converter.CompressedNftMetadata.intoUser(merged);
        }),
      );
    });
  };
}
