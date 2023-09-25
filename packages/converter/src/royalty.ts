export namespace Converter {
  export namespace Royalty {
    export const THRESHOLD = 100;
    export const convert = (percentage: number) => {
      return percentage * THRESHOLD;
    };
  }
}
