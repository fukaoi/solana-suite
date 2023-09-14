import { InfraSideOutput, Option, UserSideOutput } from '../types';

export namespace Convert.Uses {
  export const intoUserSide = (
    output: Option<InfraSideOutput.Uses>
  ): UserSideOutput.Uses | undefined => {
    if (!output) {
      return undefined;
    }
    return output;
  };
}
