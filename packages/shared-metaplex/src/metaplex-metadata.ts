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


// export type DataV2 = {
//     name: string;
//     symbol: string;
//     uri: string;
//     sellerFeeBasisPoints: number;
//     creators: beet.COption<Creator[]>;
//     collection: beet.COption<Collection>;
//     uses: beet.COption<Uses>;
// };
// export declare const dataV2Beet: beet.FixableBeetArgsStruct<DataV2>;
