export namespace Convert.Shared {
  export const convertTimestampToDate = (blockTime: number): Date => {
    return new Date(blockTime * 1000);
  };
}
