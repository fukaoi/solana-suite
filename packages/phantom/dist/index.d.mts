import { Result, Pubkey } from '@solana-suite/shared';
import { UserSideInput, ValidatorError } from 'internals/shared-metaplex';
import { Keypair, Transaction, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';

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
