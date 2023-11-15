import { Option, Uses } from '~/types/regular-nft';

export namespace Converter {
  export namespace Uses {
    export const intoUserSide = (output: Option<Uses>): Uses | undefined => {
      if (!output) {
        return undefined;
      }
      return output;
    };
  }
}
