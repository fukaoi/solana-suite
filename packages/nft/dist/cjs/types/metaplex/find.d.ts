import { Option, Creator } from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { Uses } from '@metaplex-foundation/mpl-token-metadata';
export type OutputNftMetadata = {
    mint: string;
    updateAuthority: string;
    royalty: number;
    name: string;
    symbol: string;
    uri: string;
    isMutable: boolean;
    primarySaleHappened: boolean;
    creators: Creator[];
    editionNonce: Option<number>;
    collection: Option<{
        address: PublicKey;
        verified: boolean;
    }>;
    uses: Option<Uses>;
};
