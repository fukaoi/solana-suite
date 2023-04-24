import { Instruction, KeypairAccount, Try, } from '@solana-suite/shared';
import { Pda } from '@solana-suite/shared-metaplex';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { createFreezeDelegatedAccountInstruction } from '@metaplex-foundation/mpl-token-metadata';
export var Metaplex;
(function (Metaplex) {
    /**
     * Freezing a target nft
     * it should set to freezeAuthority when mint()
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    Metaplex.freeze = (mint, owner, freezeAuthority, feePayer) => {
        const payer = feePayer ? feePayer : freezeAuthority;
        return Try(() => {
            const tokenAccount = getAssociatedTokenAddressSync(mint.toPublicKey(), owner.toPublicKey());
            const editionAddress = Pda.getMasterEdition(mint.toPublicKey());
            const inst = createFreezeDelegatedAccountInstruction({
                delegate: new KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
                tokenAccount: tokenAccount,
                edition: editionAddress,
                mint: mint.toPublicKey(),
            });
            return new Instruction([inst], [freezeAuthority.toKeypair()], payer.toKeypair());
        });
    };
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=freeze.js.map