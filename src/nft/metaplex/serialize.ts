import bs from 'bs58';
import struct from 'python-struct';
import {TextDecoder} from 'util';
import {Constants} from '../../constants';

export namespace MetaplexSerialize {

  export interface MetaData {
    publishAddress: string,
    mintKey: string,
    name: string,
    symbol: string,
    uri: string,
    fee: number
  }

  export const initData = (): MetaData => {
    return {
      publishAddress: '',
      mintKey: '',
      name: '',
      symbol: '',
      uri: '',
      fee: 0
    }
  }

  const REPLACE = new RegExp('\u0000', 'g');

  export const decode = (data: Buffer): MetaData => {
    const decodeData = initData();
    const textDecoder = new TextDecoder();
    let i = 1;
    decodeData.publishAddress = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    i += 32;
    decodeData.mintKey = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    if (decodeData.mintKey === Constants.SYSTEM_PROGRAM_ID) return decodeData;

    i += 32;
    const nameLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;

    if (nameLength !== 32) return decodeData;

    const nameBuffer = struct.unpack(`<${'B'.repeat(nameLength)}`, data.slice(i, i + nameLength)) as number[];
    decodeData.name = textDecoder.decode(Uint8Array.from(nameBuffer)).replace(REPLACE, '');
    i += nameLength
    const symbolLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const symbolBuffer = struct.unpack(`<${'B'.repeat(symbolLength)}`, data.slice(i, i + symbolLength)) as number[];
    decodeData.symbol = textDecoder.decode(Uint8Array.from(symbolBuffer)).replace(REPLACE, '');
    i += symbolLength
    const uriLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const uriBuffer = struct.unpack(`<${'B'.repeat(uriLength)}`, data.slice(i, i + uriLength)) as number[];
    decodeData.uri = textDecoder.decode(Uint8Array.from(uriBuffer)).replace(REPLACE, '');
    i += uriLength;
    decodeData.fee = parseInt(struct.unpack('<h', data.slice(i, i + 2))[0].toString(), 10);
    return decodeData;
  }
}
