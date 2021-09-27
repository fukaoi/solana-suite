/// <reference types="node" />
export declare namespace MetaplexSerialize {
    interface MetaData {
        publishAddress: string;
        mintKey: string;
        name: string;
        symbol: string;
        uri: string;
        fee: number;
    }
    const initData: () => MetaData;
    const decode: (data: Buffer) => MetaData | undefined;
}
