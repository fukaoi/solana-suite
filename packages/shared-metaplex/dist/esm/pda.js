import { PublicKey } from '@solana/web3.js';
import { PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
export var Pda;
(function (Pda) {
    Pda.getMetadata = (mint) => {
        const [publicKey] = PublicKey.findProgramAddressSync([Buffer.from('metadata'), PROGRAM_ID.toBuffer(), mint.toBuffer()], PROGRAM_ID);
        return publicKey;
    };
    Pda.getMasterEdition = (mint) => {
        const [publicKey] = PublicKey.findProgramAddressSync([
            Buffer.from('metadata'),
            PROGRAM_ID.toBuffer(),
            mint.toBuffer(),
            Buffer.from('edition'),
        ], PROGRAM_ID);
        return publicKey;
    };
})(Pda || (Pda = {}));
//# sourceMappingURL=pda.js.map