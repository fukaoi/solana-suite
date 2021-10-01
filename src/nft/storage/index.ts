import {Metaplex} from '../metaplex'

export * from './arweave';
export * from './nft-storage';

export namespace Storage {
  // tslint:disable-next-line
  export interface Attributes {}
  // tslint:disable-next-line
  export interface Collection {}
  // tslint:disable-next-line
  export interface Properties {}

  export interface Format {
    name: string,
    description: string,
    image: string,
    symbol?: string,
    seller_fee_basis_points?: number,
    animation_url?: string,
    external_url?: string,
    category?: string,
    attributes?: Attributes[],
    collection?: Collection,
    properties?: Properties[],
    creators?: Metaplex.Creators[],
  }

  export const initStorageData = (): Format => {
    return {
      name: '',
      description: '',
      image: '',
      symbol: '',
      seller_fee_basis_points: 0,
      animation_url: '',
      external_url: '',
      category: '',
      attributes: [],
      collection: {},
      properties: [],
      creators: [],
    }
  }
}

