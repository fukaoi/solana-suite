import { Secret } from './account.mjs';

type TransferOptions = {
    feePayer: Secret;
};

type GasLessTransferOptions = {
    isPriorityFee: boolean;
};

export type { GasLessTransferOptions, TransferOptions };
