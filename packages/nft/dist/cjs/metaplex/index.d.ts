import { Keypair } from '@solana/web3.js';
import { Metaplex as MetaplexFoundation, CreateNftInput } from "@metaplex-foundation/js";
import { Instruction, Result } from '@solana-suite/shared';
export declare namespace Metaplex {
    const init: (feePayer: Keypair) => MetaplexFoundation;
    /**
     * NFT mint
     *
     * @param {CreateNftInput}  input
     * {
     *   uri: {string}                 // basically storage uri
     *   name?: {string}               // NFT content name
     *   symbol?: {string}             // NFT ticker symbol
     *   sellerFeeBasisPoints?: number // Royality percentage
     *   creators?: Creator[]          // Other creators than owner
     *   collection?: Collection       // collections of different colors, shapes, etc.
     *   uses?: Uses                   // Usage feature: Burn, Single, Multipleu
     *   isMutable?: boolean           // enable update()
     *   maxSupply?: bignum            // mint copies
     *   mintAuthority?: Signer        //
     *   updateAuthority?: Signer      //
     *   freezeAuthority?: PublicKey   //
     *   owner?: PublicKey             // PublicKey that Owns nft
     * }
     * @param {Keypair} feePayer       // fee payer
     */
    const mint: (input: CreateNftInput, feePayer: Keypair) => Promise<Result<Instruction, Error>>;
}
