import { Result } from '@solana-suite/shared';
import { ValidatorError } from '@solana-suite/shared-metaplex';
import { Phantom } from '../types';
export declare namespace PhantomMetaplex {
    /**
     * Upload content and NFT mint
     *
     * @param {InputNftMetadata}  input
     * @param {Phantom} phantom        phantom wallet object
     * @return Promise<Result<Instruction, Error>>
     */
    const mint: (input: InputNftMetadata, cluster: string, phantom: Phantom) => Promise<Result<string, Error | ValidatorError>>;
}
