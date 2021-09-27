import { TransactionInstruction, TransactionSignature } from '@solana/web3.js';
export declare namespace SplNft {
    interface CreateResponse {
        tokenId: string;
    }
    export const create: (sourceSecret: string, authority?: string) => Promise<CreateResponse>;
    export const transfer: (tokenKey: string, sourceSecret: string, destPubkey: string, instruction?: TransactionInstruction | undefined) => Promise<TransactionSignature>;
    export {};
}
