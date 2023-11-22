import { Result } from '~/shared';
import { Secret } from '~/types/account';
import { RegularNft } from '~/suite-regular-nft';
import { InputNftMetadata } from '~/types/regular-nft';
import { MintTransaction } from '~/transaction';
import { MintCollectionOptions } from '~/types/compressed-nft';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {Pubkey} owner
 * @param {Secret} signer
 * @param {InputNftMetadata} input
 * @param {MintCollectionOptions} options
 * @return Promise<Result<MintTransaction, Error>>
 */
export namespace CompressedNft {
  export const mintCollection = (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    options: Partial<MintCollectionOptions> = {},
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    const { feePayer, freezeAuthority } = options;
    return RegularNft.mintCollection(
      owner,
      signer,
      input,
      feePayer,
      freezeAuthority,
    );
  };
}
