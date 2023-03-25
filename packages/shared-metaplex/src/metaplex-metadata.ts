import { DataV2 } from '@metaplex-foundation/mpl-token-metadata';
import { _InputNftMetadata } from './types';

export module MetaplexMetadata {
  export const toConvertDataV2 = (
    input: _InputNftMetadata,
    uri: string,
    sellerFeeBasisPoints: number
  ): DataV2 => {
    return {
      name: input.name,
      symbol: input.symbol,
      uri,
      sellerFeeBasisPoints,
      creators: null,
      collection: null,
      uses: null,
    };
  };
}
