import { InternalCreators } from './converter.js';
import { Pubkey } from './account.js';
import '@solana/web3.js';

type AssetProof = {
    leaf: Pubkey;
    node_index: number;
    proof: Pubkey[];
    root: Pubkey;
    tree_id: Pubkey;
};
type Metadata = {
    name: string;
    symbol: string;
    token_standard: string;
};
type Grouping = {
    group_key: string;
    group_value: string;
};
type Asset = {
    interface: string;
    id: Pubkey;
    content: {
        json_uri: string;
        files: string[];
        metadata: Metadata;
        links: string[];
    };
    authorities: {
        address: Pubkey;
        scopes: string[];
    }[];
    compression: {
        eligible: boolean;
        compressed: boolean;
        data_hash: Pubkey;
        creator_hash: Pubkey;
        asset_hash: Pubkey;
        tree: Pubkey;
        seq: number;
        leaf_id: number;
    };
    grouping: Grouping[];
    royalty: {
        royalty_model: 'creators' | 'fanout' | 'single';
        target: null;
        percent: number;
        basis_points: number;
        primary_sale_happened: boolean;
        locked: boolean;
    };
    creators: InternalCreators[];
    ownership: {
        frozen: boolean;
        delegated: boolean;
        delegate: Pubkey;
        ownership_model: 'single' | 'token';
        owner: Pubkey;
    };
    supply: {
        print_max_supply: number;
        print_current_supply: number;
        edition_nonce: number;
    };
    mutable: boolean;
    burnt: boolean;
};
type Assets = {
    total: number;
    limit: number;
    page: number;
    items: Asset[];
};
type PriorityFeeLevels = {
    min: number;
    low: number;
    medium: number;
    high: number;
    veryHigh: number;
    unsafeMax: number;
};

export type { Asset, AssetProof, Assets, Grouping, Metadata, PriorityFeeLevels };
