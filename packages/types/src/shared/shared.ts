export type AnyObject = {
  [key: string]: unknown;
};

export type OverwriteObject = {
  existsKey: string;
  will: { key: string; value: unknown };
};


