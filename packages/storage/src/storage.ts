import { Result, Secret } from '@solana-suite/shared';
import {
  _InputNftMetadata,
  Royalty,
  NftStorageMetadata,
  StorageType,
} from '@solana-suite/shared-metaplex';

//todo: replaced
import { MetaplexFileContent } from '@metaplex-foundation/js';

import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';

export namespace Storage {
  const toConvertNftStorageMetadata = (
    input: _InputNftMetadata,
    sellerFeeBasisPoints: number,
    options?: { [key: string]: unknown }
  ): NftStorageMetadata => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: '',
    };
    return { ...data, ...options };
  };

  export const uploadContent = async (
    filePath: MetaplexFileContent,
    storageType: StorageType,
    feePayer?: Secret
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      return await Arweave.uploadContent(filePath, feePayer);
    } else if (storageType === 'nftStorage') {
      return await NftStorage.uploadContent(filePath);
    } else {
      throw Error('Not found storageType');
    }
  };

  export const uploadMetaContent = async (
    input: _InputNftMetadata,
    feePayer?: Secret
  ) => {
    let storage;
    const { filePath, storageType, royalty, options, ...reducedMetadata } =
      input;
    const sellerFeeBasisPoints = Royalty.convert(royalty);
    const storageData = toConvertNftStorageMetadata(
      input,
      sellerFeeBasisPoints,
      options
    );

    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      storage = await (
        await Arweave.uploadContent(filePath, feePayer)
      ).unwrap(
        async (ok: string) => {
          storageData.image = ok;
          return await Arweave.uploadMetadata(storageData, feePayer);
        },
        (err: Error) => {
          throw err;
        }
      );
    } else if (storageType === 'nftStorage') {
      storage = await (
        await NftStorage.uploadContent(filePath)
      ).unwrap(
        async (ok: string) => {
          storageData.image = ok;
          return await NftStorage.uploadMetadata(storageData);
        },
        (err: Error) => {
          throw err;
        }
      );
    }

    if (!storage) {
      throw Error('Empty storage object');
    }

    return {
      uri: storage.unwrap(),
      sellerFeeBasisPoints,
      reducedMetadata,
    };
  };
}
