/// <reference types="node" />
import { MetaplexObject } from './object';
export declare namespace MetaplexSerialize {
    const initData: () => {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
    };
    const serializeCreateArgs: (data: MetaplexObject.Data) => Buffer;
    const serializeUpdateArgs: (data: MetaplexObject.Data, newUpdateAuthority: string | null | undefined, primarySaleHappened: boolean | null | undefined) => Buffer;
    const decode: (data: Buffer) => {
        name: string;
        symbol: string;
        uri: string;
        updateAuthority: string;
        mint: string;
    };
}
