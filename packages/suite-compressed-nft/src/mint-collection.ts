import { Result } from '~/shared';
import { Secret } from '~/types/account';
import { RegularNft } from '~/suite-regular-nft';
import { InputNftMetadata } from '~/types/regular-nft';
import { MintTransaction } from '~/transaction';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {Pubkey} owner
 * @param {Secret} signer
 * @param {InputNftMetadata} input
 * @param {Secret} feePayer?
 * @param {Pubkey} freezeAuthority?
 * @return Promise<Result<MintTransaction, Error>>
 */
export namespace CompressedNft {
  export const mintCollection = (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ): Promise<Result<MintTransaction<Pubkey>, Error>> => {
    return RegularNft.mintCollection(
      owner,
      signer,
      input,
      feePayer,
      freezeAuthority,
    );
  };
}
