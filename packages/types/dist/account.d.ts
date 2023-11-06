type Pubkey = string;
type Secret = string;
type KeypairAccount = {
    pubkey: Pubkey;
    secret: Secret;
};
type OwnerInfo = {
    sol: number;
    lamports: number;
    owner: string;
};

export { KeypairAccount, OwnerInfo, Pubkey, Secret };
