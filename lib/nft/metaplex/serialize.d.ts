/// <reference types="node" />
import { Metaplex, MetaplexInstructure } from './';
export declare namespace MetaplexSerialize {
    const serializeCreateArgs: (data: MetaplexInstructure.Data) => Buffer;
    const serializeUpdateArgs: (data: MetaplexInstructure.Data, newUpdateAuthority: string | null | undefined, primarySaleHappened: boolean | null | undefined) => Buffer;
    const decode: (data: Buffer) => Metaplex.Format;
}
