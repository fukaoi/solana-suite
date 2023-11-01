import { PublicKey } from '@solana/web3.js';

type InternalCollection = {
    key: PublicKey;
    verified: boolean;
};
type InternalCreators = {
    address: PublicKey;
    verified: boolean;
    share: number;
};

export { InternalCollection, InternalCreators };
