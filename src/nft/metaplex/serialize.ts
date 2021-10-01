import {deserializeUnchecked, serialize} from 'borsh';
import {MetaplexInstructure} from './';
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

  export const serializeCreateArgs = (data: MetaplexInstructure.Data) => {
    const value = new MetaplexInstructure.CreateMetadataArgs({data, isMutable: true});
    return Buffer.from(serialize(MetaplexInstructure.SCHEMA, value));
  }

  export const serializeUpdateArgs = (
    data: MetaplexInstructure.Data,
    newUpdateAuthority: string | null | undefined,
    primarySaleHappened: boolean | null | undefined
  ) => {
    const value = new MetaplexInstructure.UpdateMetadataArgs({
      data,
      updateAuthority: !newUpdateAuthority ? undefined : newUpdateAuthority,
      primarySaleHappened:
        primarySaleHappened === null || primarySaleHappened === undefined
          ? null
          : primarySaleHappened,
    });
    return Buffer.from(serialize(MetaplexInstructure.SCHEMA, value));
  }

  export const decode = (data: Buffer) => {
    const decoded = deserializeUnchecked(
      MetaplexInstructure.SCHEMA,
      MetaplexInstructure.Metadata,
      data
    ) as MetaplexInstructure.Metadata;
    const name = decoded.data.name.replace(REPLACE, '');
    const symbol = decoded.data.symbol.replace(REPLACE, '');
    const uri = decoded.data.uri.replace(REPLACE, '');
    const updateAuthority = new PublicKey(decoded.updateAuthority).toBase58();
    const mint = new PublicKey(decoded.mint).toBase58();
    const sellerFeeBasisPoints = decoded.data.sellerFeeBasisPoints;
    return {
      name,
      symbol,
      uri,
      updateAuthority,
      mint,
      sellerFeeBasisPoints
    }
  }
}
