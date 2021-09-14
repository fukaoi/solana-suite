import bs from 'bs58';
import struct from 'python-struct';
import {TextDecoder} from 'util';
import {Constants} from '../../constants';

export namespace MetaplexSerialize {
  const REPLACE = new RegExp('\u0000', 'g');

  export const decode = (base64Data: string) => {

    if (base64Data[0] !== 'B') return {};
    // cant decode buffer type
    const data = Buffer.from(base64Data, 'base64');
    const textDecoder = new TextDecoder();
    let i = 1;
    const ownerPubKey = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    i += 32;
    const mintKey = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    if (mintKey === Constants.SYSTEM_PROGRAM_ID) return {};

    i += 32;
    const nameLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;

    if (nameLength !== 32) return {};

    const nameBuffer = struct.unpack(`<${'B'.repeat(nameLength)}`, data.slice(i, i + nameLength)) as number[];
    const name = textDecoder.decode(Uint8Array.from(nameBuffer)).replace(REPLACE, '');
    i += nameLength
    const symbolLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const symbolBuffer = struct.unpack(`<${'B'.repeat(symbolLength)}`, data.slice(i, i + symbolLength)) as number[];
    const symbol = textDecoder.decode(Uint8Array.from(symbolBuffer)).replace(REPLACE, '');
    i += symbolLength
    const uriLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const uriBuffer = struct.unpack(`<${'B'.repeat(uriLength)}`, data.slice(i, i + uriLength)) as number[];
    const uri = textDecoder.decode(Uint8Array.from(uriBuffer)).replace(REPLACE, '');
    i += uriLength;
    const fee = struct.unpack('<h', data.slice(i, i + 2))[0];
    return {
      ownerPubKey,
      mintKey,
      name,
      symbol,
      uri,
      fee
    };
  }

  export const decode2 = (data: Buffer) => {

    const textDecoder = new TextDecoder();
    let i = 1;
    const ownerPubKey = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    i += 32;
    const mintKey = bs.encode(struct.unpack(`<${'B'.repeat(32)}`, data.slice(i, i + 32)) as number[]);
    if (mintKey === Constants.SYSTEM_PROGRAM_ID) return {};

    i += 32;
    const nameLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;

    if (nameLength !== 32) return {};

    const nameBuffer = struct.unpack(`<${'B'.repeat(nameLength)}`, data.slice(i, i + nameLength)) as number[];
    const name = textDecoder.decode(Uint8Array.from(nameBuffer)).replace(REPLACE, '');
    i += nameLength
    const symbolLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const symbolBuffer = struct.unpack(`<${'B'.repeat(symbolLength)}`, data.slice(i, i + symbolLength)) as number[];
    const symbol = textDecoder.decode(Uint8Array.from(symbolBuffer)).replace(REPLACE, '');
    i += symbolLength
    const uriLength = struct.unpack('<I', data.slice(i, i + 4))[0] as number;
    i += 4;
    const uriBuffer = struct.unpack(`<${'B'.repeat(uriLength)}`, data.slice(i, i + uriLength)) as number[];
    const uri = textDecoder.decode(Uint8Array.from(uriBuffer)).replace(REPLACE, '');
    i += uriLength;
    const fee = struct.unpack('<h', data.slice(i, i + 2))[0];
    return {
      ownerPubKey,
      mintKey,
      name,
      symbol,
      uri,
      fee
    };
  }

}
