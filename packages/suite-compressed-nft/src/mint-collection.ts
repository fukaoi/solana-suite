import { Result } from '~/suite-utils';
import { Secret } from '~/types/account';
import { RegularNft } from '~/suite-regular-nft';
import { InputNftMetadata } from '~/types/regular-nft';
import { MintCollectionOptions } from '~/types/compressed-nft';
import { MintStructure } from '~/types/transaction-builder';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {Secret} owner
 * @param {InputNftMetadata} input
 * @param {MintCollectionOptions} options
 * @returns Promise<Result<MintTransaction, Error>>
 */
export namespace CompressedNft {
  export const mintCollection = (
    owner: Secret,
    input: InputNftMetadata,
    options: Partial<MintCollectionOptions> = {},
  ): Promise<Result<MintStructure, Error>> => {
    const { feePayer, freezeAuthority } = options;
    return RegularNft.mintCollection(owner, input, {
      feePayer,
      freezeAuthority,
    });
  };
}
