//@internal
export namespace SplToken {
  export const calculateAmount = (
    amount: number,
    mintDecimal: number
  ): number => {
    return amount * 10 ** mintDecimal;
  };
}
