import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Metaplex, MetaplexInstructure } from './index';
export declare namespace MetaplexMetaData {
    const getByTokenKey: (tokenKey: PublicKey) => Promise<Metaplex.Format>;
    const getByOwner: (owner: PublicKey) => Promise<Metaplex.Format[]>;
    const create: (data: MetaplexInstructure.Data, tokenKey: PublicKey, payer: PublicKey, mintAuthorityKey?: PublicKey, updateAuthority?: PublicKey) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
    const update: (data: MetaplexInstructure.Data, newUpdateAuthority: PublicKey | null | undefined, primarySaleHappened: boolean | null | undefined, tokenKey: PublicKey, updateAuthority: PublicKey, signers: Keypair[]) => (instructions?: TransactionInstruction[] | undefined) => Promise<TransactionInstruction[]>;
}
