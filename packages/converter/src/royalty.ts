export namespace Converter {
  export namespace Royalty {
    export const THRESHOLD = 100;
    export const intoInfraSide = (percentage: number) => {
      return percentage * THRESHOLD;
    };
  }
}
