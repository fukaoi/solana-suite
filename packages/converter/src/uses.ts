import { InfraOutput, Option, UserOutput } from '~/types/converter';

export namespace Converter {
  export namespace Uses {
    export const intoUserSide = (
      output: Option<InfraOutput.Uses>,
    ): UserOutput.Uses | undefined => {
      if (!output) {
        return undefined;
      }
      return output;
    };
  }
}
