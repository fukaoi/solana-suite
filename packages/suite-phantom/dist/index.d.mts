import * as shared from 'shared';
import * as validator from 'validator';
import * as types_converter from 'types/converter';
import { Keypair, Transaction, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';

declare const Metaplex: {
    mint: (input: types_converter.UserSideInput.NftMetadata, cluster: string, phantom: Phantom) => Promise<shared.Result<string, Error | validator.ValidatorError>>;
};

declare const PhantomSplToken: {
    mint: (input: types_converter.UserSideInput.TokenMetadata, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<shared.Result<string, Error>>;
    add: (tokenKey: Pubkey, owner: Pubkey, cluster: string, totalAmount: number, mintDecimal: number, phantom: Phantom) => Promise<shared.Result<string, Error>>;
};

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

export { InitializeMint, Metaplex, Phantom, PhantomSplToken, connectOption };
