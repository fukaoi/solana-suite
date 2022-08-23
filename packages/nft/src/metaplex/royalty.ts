export namespace MetaplexRoyalty {
  export const THRESHOLD = 100;
  export const convertValue = (percentage: number) => {
    return percentage * THRESHOLD;
  }
}
