export namespace Internals_Royalty {
  export const THRESHOLD = 100;
  export const convertValue = (percentage: number) => {
    return percentage * THRESHOLD;
  }
}
