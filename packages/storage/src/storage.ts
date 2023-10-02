import { Result } from '~/shared';
import { Secret } from '~/types/account';
import { FileContent, InfraSideInput, UserSideInput } from '~/types/converter';
import { StorageType } from '~/types/storage';
// import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';

export namespace Storage {
  export const toConvertOffchaindata = (
    input: UserSideInput.NftMetadata,
    sellerFeeBasisPoints: number,
  ): InfraSideInput.Offchain => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: input.external_url,
      attributes: input.attributes,
      properties: input.properties,
      image: '',
      options: input.options,
    };
    return data;
  };

  export const uploadContent = async (
    filePath: FileContent,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      // return await Arweave.uploadContent(filePath, feePayer);
      return await NftStorage.uploadContent(filePath);
    } else if (storageType === 'nftStorage') {
      return await NftStorage.uploadContent(filePath);
    } else {
      throw Error('Not found storageType');
    }
  };

  export const uploadMetaAndContent = async (
    input: InfraSideInput.Offchain,
    filePath: FileContent,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    let storage;
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      storage = await // await Arweave.uploadContent(filePath, feePayer)
      (
        await NftStorage.uploadContent(filePath)
      ).unwrap(
        async (ok: string) => {
          input.image = ok;
          // return await Arweave.uploadMetadata(input, feePayer);
        },
        (err: Error) => {
          throw err;
        },
      );
    } else if (storageType === 'nftStorage') {
      storage = await (
        await NftStorage.uploadContent(filePath)
      ).unwrap(
        async (ok: string) => {
          input.image = ok;
          return await NftStorage.uploadMetadata(input);
        },
        (err: Error) => {
          throw err;
        },
      );
    } else {
      throw Error('No match storageType');
    }

    if (!storage) {
      throw Error('Empty storage object');
    }
    return storage;
  };
}
