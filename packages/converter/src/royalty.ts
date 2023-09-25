export namespace Convert {
  export namespace Royalty {
    export const THRESHOLD = 100;
    export const convert = (percentage: number) => {
      return percentage * THRESHOLD;
    };
  }
}
