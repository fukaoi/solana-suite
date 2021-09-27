import { Connection, Keypair } from '@solana/web3.js';
export declare namespace Util {
    const isEmpty: (val: any) => boolean;
    const sleep: (sec: number) => Promise<unknown>;
    const getConnection: () => Connection;
    const getApiUrl: () => "https://api.solana.com" | "https://api.testnet.solana.com" | "http://api.devnet.solana.com";
    const createKeypair: (secret: string) => Keypair;
    const createSigners: (signerSecrets: string[]) => Keypair[];
    const dateFormat: () => string;
}
