import { Result } from '~/shared';
import { Secret } from '~/types/account';
import { FileType, Offchain, StorageType } from '~/types/storage';
import { InputNftMetadata } from '~/types/regular-nft';
import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';

export namespace Storage {
  export const toConvertOffchaindata = (
    input: InputNftMetadata,
    sellerFeeBasisPoints: number,
  ): Offchain => {
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

  export const uploadFile = async (
    filePath: FileType,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      return await Arweave.uploadFile(filePath, feePayer);
    } else if (storageType === 'nftStorage') {
      return await NftStorage.uploadFile(filePath);
    } else {
      throw Error('Not found storageType');
    }
  };

  export const upload = async (
    input: Offchain,
    filePath: FileType,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    let storage;
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      storage = await (
        await Arweave.uploadFile(filePath, feePayer)
      ).unwrap(
        async (ok: string) => {
          input.image = ok;
          return await Arweave.uploadData(input, feePayer);
        },
        (err: Error) => {
          throw err;
        },
      );
    } else if (storageType === 'nftStorage') {
      storage = await (
        await NftStorage.uploadFile(filePath)
      ).unwrap(
        async (ok: string) => {
          input.image = ok;
          return await NftStorage.uploadData(input);
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
