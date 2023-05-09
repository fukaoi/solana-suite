import { Instruction, KeypairAccount, Try, } from '@solana-suite/shared';
import { Pda } from '@solana-suite/shared-metaplex';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createThawDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
export var Metaplex;
(function (Metaplex) {
    /**
     * Thawing a target NFT
     * it should set to freezeAuthority when mint()
     *
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    Metaplex.thaw = (mint, owner, freezeAuthority, feePayer) => {
        const payer = feePayer ? feePayer : freezeAuthority;
        return Try(() => {
            const tokenAccount = getAssociatedTokenAddressSync(mint.toPublicKey(), owner.toPublicKey());
            const editionAddress = Pda.getMasterEdition(mint);
            const inst = createThawDelegatedAccountInstruction({
                delegate: new KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
                tokenAccount: tokenAccount,
                edition: editionAddress,
                mint: mint.toPublicKey(),
            });
            return new Instruction([inst], [freezeAuthority.toKeypair()], payer.toKeypair());
        });
    };
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=thaw.js.map