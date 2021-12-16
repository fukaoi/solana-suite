import { PublicKey, TransactionInstruction, Signer } from '@solana/web3.js';
import { Metaplex, MetaplexInstructure } from './index';
import { Result } from '../../index';
export declare namespace MetaplexMetaData {
    const getByTokenKey: (tokenKey: PublicKey) => Promise<Result<Metaplex.Format, Error>>;
    const getByOwner: (owner: PublicKey) => Promise<Result<Metaplex.Format[], Error>>;
    const create: (data: MetaplexInstructure.Data, tokenKey: PublicKey, mintAuthorityKey: PublicKey, updateAuthority: PublicKey, feePayer: PublicKey) => Promise<Result<TransactionInstruction[], Error>>;
    const update: (data: MetaplexInstructure.Data, newUpdateAuthority: PublicKey | null | undefined, primarySaleHappened: boolean | null | undefined, tokenKey: PublicKey, updateAuthority: PublicKey, signers: Signer[]) => Promise<Result<TransactionInstruction[], Error>>;
}
