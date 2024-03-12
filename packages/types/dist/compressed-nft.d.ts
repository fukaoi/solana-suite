import { Pubkey, Secret } from './account.js';

type DelegateOptions = {
    delegate: Pubkey;
};

type GassLessDelegateOptions = {
    isPriorityFee: boolean;
};

type GassLessTransferOptions = {
    isPriorityFee: boolean;
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
type SpaceNumber = 8 | 16000 | 100000 | 16700000 | 67000000 | 1000000000;

export type { DelegateOptions, GassLessDelegateOptions, GassLessTransferOptions, MintCollectionOptions, MintOptions, SpaceNumber, SpaceOptions };
