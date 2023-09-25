import { InfraSideOutput, Option, UserSideOutput } from 'types/converter';

export namespace Converter {
  export namespace Uses {
    export const intoUserSide = (
      output: Option<InfraSideOutput.Uses>,
    ): UserSideOutput.Uses | undefined => {
      if (!output) {
        return undefined;
      }
      return output;
    };
  }
}
