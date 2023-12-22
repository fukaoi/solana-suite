import { Pubkey, Secret } from './account.mjs';

type DelegateOptions = {
    delegate: Pubkey;
};

type MintOptions = {
    receiver: Pubkey;
    delegate: Pubkey;
    feePayer: Secret;
};

type MintCollectionOptions = {
    freezeAuthority: Pubkey;
    feePayer: Secret;
};

type SpaceOptions = {
    feePayer: Secret;
};

export { DelegateOptions, MintCollectionOptions, MintOptions, SpaceOptions };
