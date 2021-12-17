import { PublicKey, } from '@solana/web3.js';
import { Constants, Result } from '@solana-suite/shared';
export var MetaplexAccount;
(function (MetaplexAccount) {
    MetaplexAccount.findMetaplexAssocaiatedTokenAddress = async (tokenKey) => {
        return await PublicKey.findProgramAddress([
            Buffer.from('metadata'),
            Constants.METAPLEX_PROGRAM_ID.toBuffer(),
            tokenKey.toBuffer(),
        ], Constants.METAPLEX_PROGRAM_ID)
            .then(v => Result.ok(v[0]))
            .catch((e) => Result.err(e));
    };
})(MetaplexAccount || (MetaplexAccount = {}));
