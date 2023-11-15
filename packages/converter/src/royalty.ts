export namespace Converter {
  export namespace Royalty {
    export const THRESHOLD = 100;
    export const intoInfra = (percentage: number) => {
      return percentage * THRESHOLD;
    };

    export const intoUser = (percentage: number) => {
      return percentage * THRESHOLD;
    };
  }
}
