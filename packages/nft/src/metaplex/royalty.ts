//@internal
export namespace Metaplex {
  export const THRESHOLD = 100;
  export const convertRoyalty = (percentage: number) => {
    return percentage * THRESHOLD;
  }
}
