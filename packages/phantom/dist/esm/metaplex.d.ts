import { CreateNftBuilderParams } from '@metaplex-foundation/js';
import { ValidatorError, InputMetaplexMetadata } from '@solana-suite/nft';
import { Result } from '@solana-suite/shared';
import { InitializeMint, Phantom } from './types';
export declare namespace Metaplex {
    const createNftBuilder: (params: CreateNftBuilderParams, feePayer: Phantom) => Promise<InitializeMint>;
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (input: InputMetaplexMetadata, phantom: Phantom) => Promise<Result<string, Error | ValidatorError>>;
}
