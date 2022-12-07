import { ValidatorError, InputMetaplexMetadata } from '@solana-suite/nft';
import { Result } from '@solana-suite/shared';
import { Phantom } from './types';
export declare namespace PhantomMetaplex {
    /**
     * Upload content and NFT mint
     *
     * @param {InputMetaplexMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (input: InputMetaplexMetadata, cluster: string, phantom: Phantom) => Promise<Result<string, Error | ValidatorError>>;
}
