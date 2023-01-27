import {
  BundlrSigner,
  InputNftMetadata,
  Royalty,
  NftStorageMetadata,
} from '@solana-suite/shared-metaplex';
import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';

export namespace Storage {
  const initNftStorageMetadata = (
    input: InputNftMetadata,
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

  export const uploadMetaContent = async (
    input: InputNftMetadata,
    feePayer: BundlrSigner
  ) => {
    let storage;
    const { filePath, storageType, royalty, options, ...reducedMetadata } =
      input;
    const sellerFeeBasisPoints = Royalty.convert(royalty);
    const storageData = initNftStorageMetadata(
      input,
      sellerFeeBasisPoints,
      options
    );

    if (storageType === 'arweave') {
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
