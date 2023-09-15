import { Pubkey, Result } from '@solana-suite/shared';
import BN from 'bn.js';
import { Keypair, Transaction, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';

type bignum = number | BN;
type FileContent = string | Buffer | Uint8Array | ArrayBuffer;
declare namespace _Shared {
    type Properties = {
        creators?: {
            address?: string;
            share?: number;
            [key: string]: unknown;
        }[];
        files?: {
            type?: string;
            filePath?: FileContent;
            [key: string]: unknown;
        }[];
        [key: string]: unknown;
    };
    type Attribute = {
        trait_type?: string;
        value?: string;
        [key: string]: unknown;
    };
    enum UseMethod {
        Burn = 0,
        Multiple = 1,
        Single = 2
    }
    type Uses = {
        useMethod: UseMethod;
        remaining: bignum;
        total: bignum;
    };
    type Options = {
        [key: string]: unknown;
    };
}

declare namespace UserSideInput {
    type Collection = Pubkey;
    type Creators = {
        address: Pubkey;
        share: number;
        verified: boolean;
    };
    type Properties = _Shared.Properties;
    enum TokenStandard {
        NonFungible = 0,
        FungibleAsset = 1,
        Fungible = 2,
        NonFungibleEdition = 3,
        ProgrammableNonFungible = 4
    }
    type NftMetadata = {
        name: string;
        symbol: string;
        royalty: number;
        storageType?: StorageType;
        filePath?: FileContent;
        uri?: string;
        isMutable?: boolean;
        description?: string;
        external_url?: string;
        attributes?: _Shared.Attribute[];
        properties?: Properties;
        maxSupply?: bignum;
        creators?: Creators[];
        uses?: _Shared.Uses;
        collection?: Collection;
        options?: _Shared.Options;
    };
    type TokenMetadata = {
        name: string;
        symbol: string;
        filePath?: FileContent;
        uri?: string;
        storageType?: StorageType;
        description?: string;
        royalty?: number;
        uses?: _Shared.Uses;
        creators?: Creators[];
        attributes?: _Shared.Attribute[];
        options?: _Shared.Options;
    };
}

type StorageType = 'nftStorage' | 'arweave' | string;

type Condition = 'overMax' | 'underMin';
interface Limit {
    threshold: number;
    condition: Condition;
}
interface Details {
    key: string;
    message: string;
    actual: string | number;
    limit?: Limit;
}
declare class ValidatorError extends Error {
    details: Details[];
    constructor(message: string, details: Details[]);
}

type InitializeMint = {
    mint: Keypair;
    tx: Transaction;
};

type connectOption = {
    onlyIfTrusted: false;
};
type Phantom = {
    isPhantom?: boolean;
    publicKey: PublicKey;
    isConnected: boolean;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signAndSendTransaction(transaction: Transaction, options?: SendOptions): Promise<{
        signature: TransactionSignature;
    }>;
    signMessage(message: Uint8Array): Promise<Uint8Array>;
    connect(): Promise<{
        publicKey: Uint16Array;
    }>;
    disconnect(): Promise<void>;
    _handleDisconnect(...args: unknown[]): unknown;
};

declare namespace PhantomMetaplex {
    /**
     * Upload content and NFT mint
     *
     * @param {UserSideInput.NftMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (input: UserSideInput.NftMetadata, cluster: string, phantom: Phantom) => Promise<Result<string, Error | ValidatorError>>;
}

declare const Metaplex: typeof PhantomMetaplex;

declare namespace PhantomSplToken$2 {
    const add: (tokenKey: Pubkey, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}

declare namespace PhantomSplToken$1 {
    const mint: (input: UserSideInput.TokenMetadata, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<Result<string, Error>>;
}

declare const PhantomSplToken: typeof PhantomSplToken$2 & typeof PhantomSplToken$1;

export { InitializeMint, Metaplex, Phantom, PhantomSplToken, connectOption };
