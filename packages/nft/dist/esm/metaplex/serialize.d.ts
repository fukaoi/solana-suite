/// <reference types="node" />
import { Metaplex, MetaplexInstructure } from './';
import { PublicKey } from '@solana/web3.js';
export declare namespace MetaplexSerialize {
    const serializeCreateArgs: (data: MetaplexInstructure.Data) => Buffer;
    const serializeUpdateArgs: (data: MetaplexInstructure.Data, newUpdateAuthority: PublicKey | null | undefined, primarySaleHappened: boolean | null | undefined) => Buffer;
    const decode: (data: Buffer) => Metaplex.Format;
}
