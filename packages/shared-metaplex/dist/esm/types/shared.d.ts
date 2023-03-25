/// <reference types="node" />
import BN from 'bn.js';
export type COption<T> = T | null;
export type bignum = number | BN;
export type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
