import {deserializeUnchecked, serialize} from 'borsh';
import {MetaplexObject} from './object';
import {PublicKey} from '@solana/web3.js';

export namespace MetaplexSerialize {
  const REPLACE = new RegExp('\u0000', 'g');

  export const initData = () => {
    return {
      updateAuthority: '',
      mint: '',
      name: '',
      symbol: '',
      uri: '',
    }
  }

  export const serializeCreateArgs = (data: MetaplexObject.Data) => {
    const value = new MetaplexObject.CreateMetadataArgs({data, isMutable: true});
    return Buffer.from(serialize(MetaplexObject.SCHEMA, value));
  }

  export const serializeUpdateArgs = (
    data: MetaplexObject.Data, 
    newUpdateAuthority: string | null | undefined,
    primarySaleHappened: boolean | null | undefined
  ) => {
    const value = new MetaplexObject.UpdateMetadataArgs({
      data,
      updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
      primarySaleHappened:
        primarySaleHappened === null || primarySaleHappened === undefined
          ? null
          : primarySaleHappened,
    });
    return Buffer.from(serialize(MetaplexObject.SCHEMA, value));
  }

  export const decode = (data: Buffer) => {
    const decoded = deserializeUnchecked(
      MetaplexObject.SCHEMA,
      MetaplexObject.Metadata,
      data
    ) as MetaplexObject.Metadata;
    const name = decoded.data.name.replace(REPLACE, '');
    const symbol = decoded.data.symbol.replace(REPLACE, '');
    const uri = decoded.data.uri.replace(REPLACE, '');
    const updateAuthority = new PublicKey(decoded.updateAuthority).toBase58();
    const mint = new PublicKey(decoded.mint).toBase58();
    return {
      name,
      symbol,
      uri,
      updateAuthority,
      mint
    }
  }
}
