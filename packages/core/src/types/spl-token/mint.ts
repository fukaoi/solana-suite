export type JsonMetadataAttribute = {
  trait_type?: string;
  value?: string;
  [key: string]: unknown;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  // image: string;
  uri: string;
  // description: string;
  sellerFeeBasisPoints?: number;
  creators?: null;
  collection?: null;
  uses?: null;
  animation_url?: string;
  external_url?: string;
  attributes?: JsonMetadataAttribute[];
};
