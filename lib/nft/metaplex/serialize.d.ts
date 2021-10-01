/// <reference types="node" />
export declare namespace MetaplexSerialize {
    const initData: () => {
        updateAuthority: string;
        mint: string;
        name: string;
        symbol: string;
        uri: string;
    };
    const serializeCreateArgs: (data: any) => Buffer;
    const serializeUpdateArgs: (data: any, newUpdateAuthority: string | null | undefined, primarySaleHappened: boolean | null | undefined) => Buffer;
    const decode: (data: Buffer) => {
        name: any;
        symbol: any;
        uri: any;
        updateAuthority: string;
        mint: string;
        sellerFeeBasisPoints: any;
    };
}
