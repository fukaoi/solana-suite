declare global {
  interface Number {
    toSol(): number;
    toLamports(): number;
  }

 interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }
}

export type AnyObject = {
  [key: string]: unknown;
};

export type OverwriteObject = {
  existsKey: string;
  will: { key: string; value: unknown };
};
