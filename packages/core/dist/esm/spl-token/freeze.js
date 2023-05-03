import { Instruction, KeypairAccount, Try, } from '@solana-suite/shared';
import { createFreezeAccountInstruction, getAssociatedTokenAddressSync, } from '@solana/spl-token';
export var SplToken;
(function (SplToken) {
    /**
     * Freezing a target nft
     * it should set to freezeAuthority when mint()
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    SplToken.freeze = (mint, owner, freezeAuthority, feePayer) => {
        const payer = feePayer ? feePayer : freezeAuthority;
        return Try(() => {
            const tokenAccount = getAssociatedTokenAddressSync(mint.toPublicKey(), owner.toPublicKey());
            const inst = createFreezeAccountInstruction(tokenAccount, mint.toPublicKey(), new KeypairAccount({ secret: freezeAuthority }).toPublicKey());
            return new Instruction([inst], [freezeAuthority.toKeypair()], payer.toKeypair());
        });
    };
})(SplToken || (SplToken = {}));
//# sourceMappingURL=freeze.js.map