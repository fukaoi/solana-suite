import { Result } from '~/suite-utils';
import { Secret } from '~/types/account';
import { FileType, Offchain, StorageType } from '~/types/storage';
import { InputNftMetadata } from '~/types/regular-nft';
import { Arweave } from './arweave';
import { NftStorage } from './nft-storage';

export namespace Storage {
  /* @internal */
  export const toConvertOffchaindata = (
    input: InputNftMetadata,
    sellerFeeBasisPoints: number,
  ): Offchain => {
    const data = {
      name: input.name,
      symbol: input.symbol,
      description: input.description,
      seller_fee_basis_points: sellerFeeBasisPoints,
      animation_url: input.animation_url,
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

  export const uploadData = async (
    input: Offchain,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      return await Arweave.uploadData(input, feePayer);
    } else if (storageType === 'nftStorage') {
      return await NftStorage.uploadData(input);
    } else {
      throw Error('Not found storageType');
    }
  };

  /* @internal */
  export const upload = async (
    input: Offchain,
    filePath: FileType,
    storageType: StorageType,
    feePayer?: Secret,
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave' && !feePayer) {
      throw Error('Arweave needs to have feepayer');
    }
    const storage = await (
      await uploadFile(filePath, storageType, feePayer)
    ).unwrap(
      async (ok: string) => {
        input.image = ok;
        return await uploadData(input, storageType, feePayer);
      },
      (err: Error) => {
        throw err;
      },
    );

    if (!storage) {
      throw Error('Empty storage object');
    }
    return storage;
  };
}
