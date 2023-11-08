import { Result, Try } from '~/shared';
import { Secret } from '~/types/account';
import { RegularNft } from '~/suite-regular-nft';
import { InputNftMetadata } from '~/types/regular-nft';
import { MintTransaction } from '~/transaction';

/**
 * create a collection
 * This function needs only 1 call
 *
 * @param {feePayer} Secret
 * @return Promise<Result<Instruction, Error>>
 */
export namespace CompressedNft {
  export const mintCollection = (
    owner: Pubkey,
    signer: Secret,
    input: InputNftMetadata,
    feePayer?: Secret,
    freezeAuthority?: Pubkey,
  ): Promise<Result<MintTransaction, Error>> => {
    return RegularNft.mintCollection(
      owner,
      signer,
      input,
      feePayer,
      freezeAuthority,
    );
  };
}
