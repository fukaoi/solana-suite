import { Result } from '~/suite-utils';
import {
  FileType,
  Offchain,
  StorageOptions,
  StorageType,
} from '~/types/storage';
import { InputNftMetadata } from '~/types/regular-nft';
import { Arweave } from './arweave';
import { Filebase } from './filebase';

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
    options: Partial<StorageOptions> = {},
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!options.feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      return await Arweave.uploadFile(filePath, options.feePayer);
    } else if (storageType === 'filebase') {
      return await Filebase.uploadFile(filePath);
    } else {
      throw Error('Not found storageType');
    }
  };

  export const uploadData = async (
    input: Offchain,
    storageType: StorageType,
    options: Partial<StorageOptions> = {},
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave') {
      if (!options.feePayer) {
        throw Error('Arweave needs to have feepayer');
      }
      return await Arweave.uploadData(input, options.feePayer);
    } else if (storageType === 'filebase') {
      return await Filebase.uploadData(input);
    } else {
      throw Error('Not found storageType');
    }
  };

  /* @internal */
  export const upload = async (
    input: Offchain,
    filePath: FileType,
    storageType: StorageType,
    options: Partial<StorageOptions> = {},
  ): Promise<Result<string, Error>> => {
    if (storageType === 'arweave' && !options.feePayer) {
      throw Error('Arweave needs to have feepayer');
    }
    const storage = await (
      await uploadFile(filePath, storageType, options)
    ).unwrap(
      async (ok: string) => {
        input.image = ok;
        return await uploadData(input, storageType, options);
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
